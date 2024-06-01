'use server';

import { RecipeInfo } from '@/types';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getPrompt(data: RecipeInfo) {
  return `
Przygotuj przepis kulinarny na podstawie poniższych informacji:
- **Posiadane składniki**: {${data.ingredients}}
- **Rodzaj kuchni**: {${data.cuisine}}
- **Chęć zakupienia brakujących składników**: {${data.canGoToShop ? 'tak' : 'nie'}}
`;
}

export async function getRecipe(data: RecipeInfo): Promise<string> {
  if (!process.env.ASSISTANT_ID) {
    return Promise.reject('Assistant ID is not defined');
  }

  try {
    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: getPrompt(data),
    });
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: process.env.ASSISTANT_ID,
    });

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      const recipe = messages.data[0].content.find((m) => m.type === 'text') as
        | OpenAI.Beta.Threads.Messages.TextContentBlock
        | undefined;

      if (!recipe) {
        return Promise.reject('Cant figure out any recipe');
      }

      return Promise.resolve(recipe.text.value);
    }

    return Promise.reject(run.status);
  } catch (error) {
    console.log(error);
    return Promise.reject('Error while retrieving the recipe');
  }
}
