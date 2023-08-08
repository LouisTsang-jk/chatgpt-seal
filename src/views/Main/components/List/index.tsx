import { useEffect } from 'react'
import styled from 'styled-components'
import {
  Box,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import globalState, { ListType, StorageKey } from '@/globalState'
import useStorage from '@/hooks/useStorage'
import EmptyIcon from '@mui/icons-material/Inbox'
import HotPromptZhList from '@/conf/prompts_zh.json'
import HotPromptEnList from '@/conf/prompts.json'
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
  const { templateList, isBatchOperationActive, listType } = globalState
  const { t } = useTranslation()

  const [language] = useStorage('language')
  const [templateStorage] = useStorage<Template[]>(StorageKey)

  useEffect(() => {
    if (listType.value === ListType.regular) {
      templateList.value = templateStorage || []
    }
    if (listType.value === ListType.hot) {
      const hotPromptList =
        language === 'zh' ? HotPromptZhList : HotPromptEnList
      templateList.value =
        (hotPromptList.map((prompt, promptIndex) => ({
          ...prompt,
          id: `${promptIndex}`
        })) as Template[]) || []
    }
  }, [templateStorage, listType.value, language])

  const onListItemClick = (template: Template) => {
    if (!isBatchOperationActive.value) {
      fillTextarea(template)
      return
    }
    template.checked = !template.checked
    templateList.value = [...templateList.value]
  }

  const fillTextarea = (template: Template) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tabId = tabs[0].id as number
      chrome.tabs.sendMessage(tabId, {
        type: 'fill',
        data: {
          template: template.body
        }
      })
    })
  }

  return (
    <Box sx={{ marginTop: '8px', maxHeight: '400px' }}>
      {templateList.value.map((template, templateIndex: number) => (
        <ListItemButton
          dense
          component="li"
          key={templateIndex}
          sx={{ padding: '0 8px' }}
          onClick={() => onListItemClick(template)}
        >
          {isBatchOperationActive.value && (
            <ListItemIcon sx={{ marginLeft: '-8px', minWidth: 'auto' }}>
              <Checkbox
                size="small"
                checked={template.checked || false}
                inputProps={{ 'aria-label': 'controlled' }}
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
      {templateList.value.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <EmptyIcon color="secondary" style={{ fontSize: 60 }} />
          <Typography color="secondary" variant="h6">
            {t('No templates, please create one first')}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
