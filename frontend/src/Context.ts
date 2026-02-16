import { createContext } from "react"

type DataSyncContext = {
    needSync: boolean
}

type HomePageBlurContextType = (bool: boolean) => void


const PieChartDataSyncContext = createContext<DataSyncContext>({ needSync: false })
const TableDataSyncContext = createContext<DataSyncContext>({ needSync: false })
const HomePageBlurContext = createContext<HomePageBlurContextType>({} as HomePageBlurContextType)

export {
    PieChartDataSyncContext,
    TableDataSyncContext,
    HomePageBlurContext
} 