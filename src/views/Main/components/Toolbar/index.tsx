import { IconButton, InputBase, Tooltip } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import SettingsIcon from "@mui/icons-material/Settings"
// import ChecklistIcon from "@mui/icons-material/Checklist"
import styled from "styled-components"

const ToolbarTitleDiv = styled.div``

const ToolbarActionDiv = styled.div`
  display: flex;
`

const SearchContainerDiv = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid red;
  border-radius: 12px;
  padding: 0 8px;
  margin: 0 16px;
`

const SearchInput = styled(InputBase)`
  & input {
    padding: 0;
  }
`

const ActionBtnGroupDiv = styled.div`
  button + button {
    margin: 0 0 0 4px;
  }
`

export default function Toolbar() {
  const createScene = () => {
    const title = prompt('Please Enter Scene Title') || 'default title';
    const promptTemplate = prompt('Please Enter Prompt Template') || 'default template';
    chrome.storage.local.get('scene', function (data) {
      const sceneList: Scene[] = data.scene || [];
      sceneList.push({
        id: Symbol(),
        title,
        promptTemplate
      });
      chrome.storage.local.set({ 'scene': sceneList }, function () {
        alert('Scene create success!');
        location.reload();
      });
    });
  }

  return (
    <>
      <ToolbarTitleDiv>Scene List</ToolbarTitleDiv>
      <ToolbarActionDiv>
        <SearchContainerDiv>
          <SearchIcon />
          <SearchInput
            size="small"
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
        </SearchContainerDiv>
        <ActionBtnGroupDiv onClick={createScene}>
          <Tooltip title="Create a new Scene">
            <IconButton color="secondary" aria-label="Create a new scene">
              <AddIcon />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Batch operate">
            <IconButton color="secondary" aria-label="Batch operate">
              <ChecklistIcon />
            </IconButton>
          </Tooltip> */}
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
