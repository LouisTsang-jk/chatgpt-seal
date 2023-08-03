import { createContext, useState } from "react"

export const StorageKey = "templates"

export enum ListType {
  regular = "regular",
  hot = "hot"
}

export const DataContext = createContext<{
  templateList: Template[]
  setTemplateList: (list: Template[]) => void
  currentTemplate: Template | null
  setCurrentTemplate: (current: Template) => void
  listType: ListType
  setListType: (type: ListType) => void
  isBatchOperationActive: boolean
  setIsBatchOperationActive: (on: boolean) => void
}>({
  templateList: [],
  setTemplateList: (list) => {
    list
  },
  currentTemplate: null,
  setCurrentTemplate: (current) => {
    current
  },
  listType: ListType.regular,
  setListType: (type: ListType) => {
    type
  },
  isBatchOperationActive: false,
  setIsBatchOperationActive: (on: boolean) => {
    on
  }
})

export const DataProvider = ({ children }: any) => {
  const [templateList, setTemplateList] = useState<Template[]>([])
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null)
  const [listType, setListType] = useState<ListType>(ListType.regular)
  const [isBatchOperationActive, setIsBatchOperationActive] =
    useState<boolean>(false)

  return (
    <DataContext.Provider
      value={{
        templateList,
        setTemplateList,
        currentTemplate,
        setCurrentTemplate,
        listType,
        setListType,
        isBatchOperationActive,
        setIsBatchOperationActive
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
