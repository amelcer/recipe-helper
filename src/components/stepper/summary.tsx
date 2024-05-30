import { useStepperContext } from "./context"

export default function Summary() {
    const { canGoToShop, cuisine, ingredients } = useStepperContext()



    return <>{JSON.stringify({ canGoToShop, cuisine, ingredients })}</>
}
