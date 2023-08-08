import {
  Box,
  IconButton,
  InputBase,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import ChecklistIcon from '@mui/icons-material/Checklist'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import GetAppIcon from '@mui/icons-material/GetApp'
import PublishIcon from '@mui/icons-material/Publish'
import ArticleIcon from '@mui/icons-material/Article'
import SettingsIcon from '@mui/icons-material/Settings'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import globalState, { ListType, StorageKey } from '@/globalState'
import { useEffect, useState } from 'react'
import Confirm from '../Confirm'
import useStorage from '@/hooks/useStorage'
import { useSnackbar } from '@/common/SnackbarContext'
import { useTranslation } from 'react-i18next'
import useJsonExport from '@/hooks/useExport'

const ToolbarTitleDiv = styled.div``

const ToolbarActionDiv = styled.div`
  display: flex;
  align-items: center;
`

const SearchContainerDiv = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 0 8px;
  margin: 0 8px;
  height: 24px;
`

const SearchInput = styled(InputBase)`
  & input {
    padding: 0;
  }
`

const SearchInputIcon = styled(SearchIcon)`
  font-size: 20px;
  color: #ccc;
`

const ActionBtnGroupDiv = styled.div`
  display: flex;
  align-items: center;
  button + button {
    margin: 0 0 0 4px;
  }
`

export default function Toolbar() {
  const { t } = useTranslation()

  const { templateList, listType, isBatchOperationActive } = globalState

  const [disabledBatchAction, disabledBatchActionChange] =
    useState<boolean>(true)
  const [deleteDialogVisible, deleteDialogVisibleChange] =
    useState<boolean>(false)

  const { exportToJsonFile } = useJsonExport()

  const [, setTemplateStorage] = useStorage<Template[]>(StorageKey)

  const { openSnackbar } = useSnackbar()

  useEffect(() => {
    for (const template of templateList.value) {
      if (template.checked) {
        console.log('template', template)
        disabledBatchActionChange(false)
        return
      }
    }
    disabledBatchActionChange(true)
  }, [templateList.value])

  const handleBatchDelete = (agree: boolean) => {
    if (!agree) return
    const updateTemplateList = templateList.value.filter((template) => {
      return !template.checked
    })
    setTemplateStorage([...updateTemplateList])
    templateList.value = [...updateTemplateList]
    openSnackbar(t('Delete Template Success'))
    deleteDialogVisibleChange(false)
    isBatchOperationActive.value = false
  }

  const onListTypeChange = (
    evt: React.MouseEvent<HTMLElement>,
    type: ListType
  ) => {
    if (type && evt) {
      globalState.listType.value = type
    }
  }

  const onExport = () => {
    exportToJsonFile(templateList.value)
  }

  const control = {
    value: listType.value,
    onChange: onListTypeChange,
    exclusive: true
  }

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <ToolbarTitleDiv>
        <ToggleButtonGroup size="small" {...control}>
          <ToggleButton value="regular" key="regular">
            <Tooltip title={t('Template list')}>
              <ArticleIcon />
            </Tooltip>
          </ToggleButton>
          {!isBatchOperationActive.value && (
            <ToggleButton value="hot" key="hot">
              <Tooltip title={t('Recommended templates')}>
                <WhatshotIcon />
              </Tooltip>
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      </ToolbarTitleDiv>
      <ToolbarActionDiv>
        {false && (
          <>
            <SearchContainerDiv>
              <SearchInputIcon />
              <SearchInput
                placeholder={t('Search')}
                inputProps={{ 'aria-label': 'search' }}
              />
            </SearchContainerDiv>
          </>
        )}
        {listType.value === ListType.regular && (
          <ActionBtnGroupDiv>
            {!isBatchOperationActive.value && (
              <>
                <Link to="/create">
                  <Tooltip title={t('Create a new Template')}>
                    <IconButton
                      aria-label="Create a new template"
                      sx={{ margin: '0 4px' }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link to="/import">
                  <Tooltip title={t('Import')}>
                    <IconButton aria-label="Import">
                      <GetAppIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip title={t('Export')} onClick={onExport}>
                  <IconButton aria-label="Export">
                    <PublishIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}

            <Tooltip title={t('Batch operation')}>
              <ToggleButton
                value="check"
                aria-label="Batch operation"
                selected={isBatchOperationActive.value}
                sx={{
                  border: 0,
                  borderRadius: '50%',
                  padding: '8px',
                  margin: '0 4px'
                }}
                onChange={() =>
                  (isBatchOperationActive.value =
                    !isBatchOperationActive.value)
                }
              >
                <ChecklistIcon />
              </ToggleButton>
            </Tooltip>
            {isBatchOperationActive.value && (
              <Tooltip
                title={
                  disabledBatchAction
                    ? t('Please choose a template to delete')
                    : t('Delete')
                }
              >
                <Box display="inline-flex">
                  <IconButton
                    disabled={disabledBatchAction}
                    onClick={() => deleteDialogVisibleChange(true)}
                    aria-label="Delete"
                  >
                    <DeleteOutlineIcon />
                    <Confirm
                      visible={deleteDialogVisible}
                      text={t(
                        'Are you sure you want to delete the selected template?'
                      )}
                      handleConfirm={handleBatchDelete}
                    />
                  </IconButton>
                </Box>
              </Tooltip>
            )}
            {!isBatchOperationActive.value && (
              <>
                <Link to="setting">
                  <Tooltip title={t('Setting')}>
                    <IconButton aria-label="Setting">
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link to="/about">
                  <Tooltip title={t('Info')}>
                    <IconButton aria-label="Info">
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
              </>
            )}
          </ActionBtnGroupDiv>
        )}
      </ToolbarActionDiv>
    </Box>
  )
}
