import styled from "styled-components"
import Toolbar from "./components/Toolbar"
import List from "./components/List"


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

export default function Main() {
  return (
    <>
      <ToolbarContainerDiv>
        <Toolbar />
      </ToolbarContainerDiv>
      <ListContainerDiv>
        <List />
      </ListContainerDiv>
    </>
  )
}
