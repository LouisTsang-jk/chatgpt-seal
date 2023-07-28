import { useContext, useEffect } from "react"
import styled from "styled-components"
import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material"
import { DataContext, StorageKey } from "@/DataContext"

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
export default function List() {
  const { templateList, setTemplateList } = useContext(DataContext)
  const mock: Template[] = [
    {
      id: '1',
      body: "模板 - 🐱",
      title: "🐱🐱🐱🐱🐱",
      checked: false
    },
    {
      id: '2',
      body: "模板 - 🐶",
      title: "🐶🐶🐶🐶🐶",
      checked: false
    },
    {
      id: '3',
      body: "模板 - 🐯",
      title: "🐯🐯🐯🐯🐯",
      checked: false
    },
    {
      id: '4',
      body: "模板 - 🐼",
      title: "🐼🐼🐼🐼🐼",
      checked: false
    },
    {
      id: '5',
      body: "模板 - 🐲",
      title: "🐲🐲🐲🐲🐲",
      checked: false
    }
  ]
  useEffect(() => {
    setTemplateList(mock)
    chrome?.storage?.local.get(StorageKey).then((data) => {
      // setSceneList(data.scenes || [])
      setTemplateList(data[StorageKey] || [])
    })
  }, [])

  const handleToggle = (template: Template) => {
    console.log("handleToggle:", template)
    template.checked = !template.checked
    setTemplateList([...templateList])
  }

  return (
    <>
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
    </>
  )
}
