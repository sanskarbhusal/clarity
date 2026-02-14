import { createContext } from "react"

type DataSyncContext = {
    needSync: boolean
}

const PieChartDataSyncContext = createContext<DataSyncContext>({ needSync: false })
const TableDataSyncContext = createContext<DataSyncContext>({ needSync: false })

export {
    PieChartDataSyncContext,
    TableDataSyncContext
} 