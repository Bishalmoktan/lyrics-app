import { AppContext, AppContextType } from "@/components/providers/app-context-provider"
import { useContext } from "react"

export const useGlobalApp = () => {
    return useContext(AppContext) as AppContextType;
}