import { RecipeInfo } from '@/types';
import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';

type StepperContext = RecipeInfo & {
  onIngredientsChange: (data: string[]) => void;
  onCuisineChange: (data: string[]) => void;
  onCanGoToShopChange: (data: boolean) => void;
  page: number;
  nextPage: () => void;
  prevPage: () => void;
  reset: () => void;
};

const Context = createContext<StepperContext>({
  ingredients: [],
  cuisine: [],
  canGoToShop: true,
  page: 0,
  nextPage: () => {},
  prevPage: () => {},
  reset: () => {},
  onIngredientsChange: () => {},
  onCuisineChange: () => {},
  onCanGoToShopChange: () => {},
});

export default function StepperContextProvider({ children }: PropsWithChildren) {
  const [dishInfo, setDishInfo] = useState<Pick<StepperContext, 'canGoToShop' | 'cuisine' | 'ingredients'>>({
    ingredients: [],
    cuisine: [],
    canGoToShop: true,
  });
  const [page, setPage] = useState(0);

  const handleIngredientsChange = (newIngredients: string[]) => {
    setDishInfo((info) => ({ ...info, ingredients: newIngredients }));
  };

  const handleCuisineChange = useCallback((newCuisine: string[]) => {
    setDishInfo((info) => ({ ...info, cuisine: newCuisine }));
  }, []);

  const handleCanGoToShopChange = useCallback((canGoToShop: boolean) => {
    setDishInfo((info) => ({ ...info, canGoToShop }));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const handlePrevPage = useCallback(() => {
    setPage((p) => p - 1);
  }, []);

  const handleReset = useCallback(() => {
    setPage(0);
    setDishInfo({
      ingredients: [],
      cuisine: [],
      canGoToShop: true,
    });
  }, []);

  const value = useMemo<StepperContext>(
    () => ({
      ...dishInfo,
      page,
      nextPage: handleNextPage,
      prevPage: handlePrevPage,
      reset: handleReset,
      onIngredientsChange: handleIngredientsChange,
      onCuisineChange: handleCuisineChange,
      onCanGoToShopChange: handleCanGoToShopChange,
    }),
    [dishInfo, handleIngredientsChange, handleCuisineChange, handleCanGoToShopChange]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useStepperContext() {
  return useContext(Context);
}
