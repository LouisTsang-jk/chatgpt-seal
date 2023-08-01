import styled from "styled-components"
import Toolbar from "./components/Toolbar"
import List from "./components/List"
import { useToggle } from "react-use"

const ToolbarContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ListContainerDiv = styled.div`
  height: 100%;
  overflow: auto;
`

export default function Main() {
  const [isBatchOperationActive, toggleIsBatchOperationActive] =
    useToggle(false)

  return (
    <>
      <ToolbarContainerDiv>
        <Toolbar
          isBatchOperationActive={isBatchOperationActive}
          handleBatchChange={toggleIsBatchOperationActive}
        />
      </ToolbarContainerDiv>
      <ListContainerDiv>
        <List isBatchOperationActive={isBatchOperationActive} />
      </ListContainerDiv>
    </>
  )
}
