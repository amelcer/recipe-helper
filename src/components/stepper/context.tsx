import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';

type StepperContext = {
    ingredients: string[];
    cuisine: string[];
    canGoToShop: boolean;
    onIngredientsChange: (data: string[]) => void
    onCuisineChange: (data: string[]) => void
    onCanGoToShopChange: (data: boolean) => void
};

const Context = createContext<StepperContext>({
    ingredients: [],
    cuisine: [],
    canGoToShop: false,
    onIngredientsChange: () => { },
    onCuisineChange: () => { },
    onCanGoToShopChange: () => { },
});

export default function StepperContextProvider({ children }: PropsWithChildren) {
    const [dishInfo, setDishInfo] = useState<Pick<StepperContext, 'canGoToShop' | 'cuisine' | 'ingredients'>>({
        ingredients: [],
        cuisine: [],
        canGoToShop: false,
    });

    const handleIngredientsChange =
        (newIngredients: string[]) => {
            console.log(newIngredients)
            setDishInfo((info) => ({ ...info, ingredients: newIngredients }));
        }



    const handleCuisineChange = useCallback(
        (newCuisine: string[]) => {
            setDishInfo((info) => ({ ...info, cuisine: newCuisine }));
        },
        []
    );

    const handleCanGoToShopChange = useCallback(
        (canGoToShop: boolean) => {
            setDishInfo((info) => ({ ...info, canGoToShop }));
        },
        []
    );

    const value = useMemo<StepperContext>(
        () => ({
            ...dishInfo,
            onIngredientsChange: handleIngredientsChange,
            onCuisineChange: handleCuisineChange,
            onCanGoToShopChange: handleCanGoToShopChange,
        }),
        [dishInfo, handleIngredientsChange, handleCuisineChange, handleCanGoToShopChange]
    );

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useStepperContext() {
    return useContext(Context)
}
