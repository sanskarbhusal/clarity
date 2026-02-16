import { createContext } from "react"

type DataSyncContextType = {
    syncTrigger: boolean,
    setSyncTrigger: (param: any) => void
}
type AuthContextType = string
type HomePageBlurContextType = (bool: boolean) => void

const DataSyncContext = createContext<DataSyncContextType>({
    syncTrigger: false,
    setSyncTrigger: () => { }
})
const AuthContext = createContext<AuthContextType>("")
const HomePageBlurContext = createContext<HomePageBlurContextType>(() => { })

export {
    DataSyncContext,
    HomePageBlurContext,
    AuthContext
} 