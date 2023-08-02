import {
  Box,
  IconButton,
  InputBase,
  ToggleButton,
  Tooltip
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import ChecklistIcon from "@mui/icons-material/Checklist"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { DataContext, StorageKey } from "@/DataContext"
import { useContext, useEffect } from "react"
import { useToggle } from "react-use"
import Confirm from "../Confirm"
import useStorage from "@/hooks/useStorage"
import { useSnackbar } from "@/common/SnackbarContext"

interface ToolbarProps {
  isBatchOperationActive: boolean
  handleBatchChange: (nextValue?: any) => void
}

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

export default function Toolbar(props: ToolbarProps) {
  const { isBatchOperationActive, handleBatchChange } = props
  const { templateList, setTemplateList } = useContext(DataContext)

  const [disabledBatchAction, disabledBatchActionChange] = useToggle(true)
  const [deleteDialogVisible, deleteDialogVisibleChange] = useToggle(false)

  const [, setTemplateStorage] = useStorage<Template[]>(StorageKey)

  const { openSnackbar } = useSnackbar()

  useEffect(() => {
    for (const template of templateList) {
      if (template.checked) {
        disabledBatchActionChange(false)
        return
      }
    }
    disabledBatchActionChange(true)
  }, [templateList])

  const handleBatchDelete = (agree: boolean) => {
    if (!agree) return
    const updateTemplateList = templateList.filter((template) => {
      return !template.checked
    })
    setTemplateStorage([...updateTemplateList])
    setTemplateList([...updateTemplateList])
    openSnackbar("Delete Template Success")
    deleteDialogVisibleChange(false)
    handleBatchChange(false)
  }

  return (
    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
      <ToolbarTitleDiv>Template List</ToolbarTitleDiv>
      <ToolbarActionDiv>
        {false && (
          <>
            <SearchContainerDiv>
              <SearchInputIcon />
              <SearchInput
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
            </SearchContainerDiv>
          </>
        )}
        <ActionBtnGroupDiv>
          <Link to="/create">
            <Tooltip title="Create a new Template">
              <IconButton aria-label="Create a new template">
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title="Batch operate">
            <ToggleButton
              value="check"
              aria-label="Batch operate"
              selected={isBatchOperationActive}
              sx={{
                border: 0,
                borderRadius: "50%",
                padding: "8px",
                marginLeft: "4px"
              }}
              onChange={handleBatchChange}
            >
              <ChecklistIcon />
            </ToggleButton>
          </Tooltip>
          {isBatchOperationActive && (
            <Tooltip
              title={
                disabledBatchAction
                  ? "Please choose a template to delete"
                  : "Delete"
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
                    text="Are you sure you want to delete the selected template?"
                    handleConfirm={handleBatchDelete}
                  />
                </IconButton>
              </Box>
            </Tooltip>
          )}
          <Link to="/about">
            <Tooltip title="Info">
              <IconButton aria-label="Info">
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </ActionBtnGroupDiv>
      </ToolbarActionDiv>
    </Box>
  )
}
