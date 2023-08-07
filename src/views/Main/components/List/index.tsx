import { useContext, useEffect } from "react"
import styled from "styled-components"
import {
  Box,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material"
import { DataContext, ListType, StorageKey } from "@/DataContext"
import useStorage from "@/hooks/useStorage"
import EmptyIcon from "@mui/icons-material/Inbox"
import HotPromptZhList from "@/conf/prompts_zh.json"
import HotPromptEnList from "@/conf/prompts.json"
import { useTranslation } from 'react-i18next'

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
  const { isBatchOperationActive } = useContext(DataContext)
  const { listType } = useContext(DataContext)
  const { t } = useTranslation()

  const [language] = useStorage('language')
  const [templateStorage] = useStorage<Template[]>(StorageKey)

  useEffect(() => {
    if (listType === ListType.regular) {
      setTemplateList(templateStorage || [])
    }
    if (listType === ListType.hot) {
      const HotPromptList = language === 'zh' ? HotPromptZhList : HotPromptEnList
      setTemplateList((HotPromptList.map((prompt, promptIndex) => ({
        ...prompt,
        id: `${promptIndex}`
      })) as Template[]) || [])
    }
  }, [templateStorage, listType, language])

  const handleToggle = (template: Template) => {
    if (!isBatchOperationActive) {
      fillTextarea(template)
      return
    }
    template.checked = !template.checked
    setTemplateList([...templateList])
  }

  const fillTextarea = (template: Template) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tabId = tabs[0].id as number
      chrome.tabs.sendMessage(
        tabId,
        { type: "fill", data: {
          template: template.body
        }}
      )
    })
  }

  return (
    <Box sx={{marginTop: '8px', maxHeight: '400px'}}>
      {templateList.map((template, templateIndex: number) => (
        <ListItemButton
          dense
          component="li"
          key={templateIndex}
          sx={{ padding: "0 8px" }}
          onClick={() => handleToggle(template)}
        >
          {isBatchOperationActive && (
            <ListItemIcon sx={{marginLeft: '-8px', minWidth: 'auto'}}>
              <Checkbox
                size="small"
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
      {templateList.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <EmptyIcon color="secondary" style={{ fontSize: 60 }} />
          <Typography color="secondary" variant="h6">{t('No templates, please create one first')}</Typography>
        </Box>
      )}
    </Box>
  )
}
