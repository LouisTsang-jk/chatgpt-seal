import { IconButton, InputBase, ToggleButton, Tooltip } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import SettingsIcon from "@mui/icons-material/Settings"
import ChecklistIcon from "@mui/icons-material/Checklist"
import styled from "styled-components"
import { Link } from "react-router-dom"

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
  button {
    color: #333;
  }
  button + button {
    margin: 0 0 0 4px;
  }
`

export default function Toolbar(props: ToolbarProps) {
  const { isBatchOperationActive, handleBatchChange } = props
  
  return (
    <>
      <ToolbarTitleDiv>Scene List</ToolbarTitleDiv>
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
            <Tooltip title="Create a new Scene">
              <IconButton color="secondary" aria-label="Create a new scene">
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
          <Tooltip title="Setting">
            <IconButton color="secondary" aria-label="Setting">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </ActionBtnGroupDiv>
      </ToolbarActionDiv>
    </>
  )
}
