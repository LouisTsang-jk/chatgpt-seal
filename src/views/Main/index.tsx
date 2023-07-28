import { ChangeEvent, useContext, useEffect } from "react"
import styled from "styled-components"
import Toolbar from "./components/Toolbar"
import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material"
import { DataContext, StorageKey } from "@/DataContext"


const ToolbarContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ListContainerDiv = styled.div`
  height: 100%;
  max-height: 500px;
  overflow: auto;
`

const TemplateDescriptionSpan = styled.span`
  color: #ccc;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`

const TruncateSpan = styled.span`
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default function Main() {
  const mock: Template[] = [
    {
      id: Symbol(),
      body: "模板 - 🐱",
      title: "🐱🐱🐱🐱🐱",
      checked: false
    },
    {
      id: Symbol(),
      body: "模板 - 🐶",
      title: "🐶🐶🐶🐶🐶",
      checked: false
    },
    {
      id: Symbol(),
      body: "模板 - 🐯",
      title: "🐯🐯🐯🐯🐯",
      checked: false
    },
    {
      id: Symbol(),
      body: "模板 - 🐼",
      title: "🐼🐼🐼🐼🐼",
      checked: false
    },
    {
      id: Symbol(),
      body: "模板 - 🐲",
      title: "🐲🐲🐲🐲🐲",
      checked: false
    }
  ]

  const { templateList, setTemplateList } = useContext(DataContext)

  useEffect(() => {
    setTemplateList(mock)
    chrome?.storage?.local.get(StorageKey).then((data) => {
      // setSceneList(data.scenes || [])
      setTemplateList(data[StorageKey] || [])
    })
  }, [])

  const handleToggle = (template: Template) => {
    console.log('handleToggle:', template)
    template.checked = !template.checked
    setTemplateList([...templateList])
  }

  return (
    <>
      <ToolbarContainerDiv>
        <Toolbar />
      </ToolbarContainerDiv>
      <ListContainerDiv>
        {templateList.map((template, templateIndex: number) => (
          <ListItemButton
            dense
            component="li"
            key={templateIndex}
            onClick={() => handleToggle(template)}
          >
            <ListItemIcon>
              <Checkbox
                checked={template.checked}
                inputProps={{ "aria-label": "controlled" }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <TruncateSpan title={template.title}>
                  {template.title}
                </TruncateSpan>
              }
              secondary={
                <>
                  <TemplateDescriptionSpan title={template.body}>
                    {template.body}
                  </TemplateDescriptionSpan>
                </>
              }
            />
          </ListItemButton>
        ))}
      </ListContainerDiv>
    </>
  )
}
