'use server';

import OpenAI from 'openai';
import { Uploadable } from 'openai/uploads.mjs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getAssistantFiles() {
  try {
    const files = await openai.files.list({ purpose: 'assistants' });

    return files.data;
  } catch (e) {
    console.log(e);

    return [];
  }
}

export async function uploadAssistantFile(form: FormData): Promise<string> {
  const file = form.get('file') as Uploadable;

  try {
    const uploadedFile = await openai.files.create({ file, purpose: 'assistants' });

    return uploadedFile.filename;
  } catch (e) {
    console.log(e);

    return '';
  }
}

export async function deleteAssistantFile(fileId: string): Promise<boolean> {
  try {
    const uploadedFile = await openai.files.del(fileId);

    return uploadedFile.deleted;
  } catch (e) {
    console.log(e);

    return false;
  }
}
