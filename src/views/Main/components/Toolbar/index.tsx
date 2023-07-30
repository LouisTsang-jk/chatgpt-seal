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
import { DataContext } from "@/DataContext"
import { useContext, useEffect } from "react"
import { useToggle } from "react-use"

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
  border-radius: 8px;
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
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  button {
    color: #333;
  }
  button + button {
    margin: 0 0 0 4px;
  }
`

export default function Toolbar(props: ToolbarProps) {
  const { isBatchOperationActive, handleBatchChange } = props
  const { templateList } = useContext(DataContext)

  const [disabledBatchAction, disabledBatchActionChange] = useToggle(true)

  useEffect(() => {
    for (const template of templateList) {
      if (template.checked) {
        disabledBatchActionChange(false)
        return
      }
    }
    disabledBatchActionChange(true)
  }, [templateList])

  const handleBatchDelete = () => {
    console.log('templateList:', templateList)
  }
  
  return (
    <>
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
              <IconButton color="secondary" aria-label="Create a new template">
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title="Batch operate">
            <ToggleButton
              value="check"
              aria-label="Batch operate"
              color="secondary"
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
                  color="secondary"
                  disabled={disabledBatchAction}
                  onClick={handleBatchDelete}
                  aria-label="Delete"
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </Tooltip>
          )}
          <Link to="/about">
            <Tooltip title="Info">
              <IconButton color="secondary" aria-label="Info">
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </ActionBtnGroupDiv>
      </ToolbarActionDiv>
    </>
  )
}
