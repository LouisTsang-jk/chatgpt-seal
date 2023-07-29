import { useContext, useEffect } from "react"
import styled from "styled-components"
import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material"
import { DataContext, StorageKey } from "@/DataContext"
import useStorage from "@/hooks/useStorage"

interface ListProps {
  isBatchOperationActive: boolean
}

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
export default function List(props: ListProps) {
  const { isBatchOperationActive } = props

  const { templateList, setTemplateList } = useContext(DataContext)

  const [templateStorage] = useStorage<Template[]>(StorageKey)

  useEffect(() => {
    setTemplateList(templateStorage || [])
  }, [templateStorage])

  const handleToggle = (template: Template) => {
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
          {isBatchOperationActive && (
            <ListItemIcon>
              <Checkbox
                checked={template.checked || false}
                inputProps={{ "aria-label": "controlled" }}
              />
            </ListItemIcon>
          )}
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
