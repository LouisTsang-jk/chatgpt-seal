import { createContext, useState } from "react"

export const StorageKey = "templates"

export const DataContext = createContext<{
  templateList: Template[]
  setTemplateList: (list: Template[]) => void
  currentTemplate: Template | null
  setCurrentTemplate: (current: Template) => void
}>({
  templateList: [],
  setTemplateList: (list) => { list },
  currentTemplate: null,
  setCurrentTemplate: (current) => { current },
  
})

export const DataProvider = ({ children }: any) => {
  const [templateList, setTemplateList] = useState<Template[]>([])
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null)

  return (
    <DataContext.Provider
      value={{
        templateList,
        setTemplateList,
        currentTemplate,
        setCurrentTemplate
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
