import { Dispatch, SetStateAction, createContext, useEffect } from "react"
import styled from "styled-components"
import Toolbar from "./components/Toolbar"
// import BottomTab from "./components/BottomTab"

export const STORAGE_KEY = "scenes"

const LayoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 360px;
  width: 600px;
  border-radius: 12px;
  border: 1px solid pink;
  padding: 16px;
`

const ToolbarContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ListContainerDiv = styled.div`
  height: 100%;
`

// const BottomTabContainerDiv = styled.div``

interface ITabContext {
  currentTab: number | null;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}

export const TabContext = createContext<ITabContext>({
  currentTab: null,
  setCurrentTab: () => {}
})

export default function Main() {
  // const [currentTab, setCurrentTab] = useState<number>(0);
  useEffect(() => {
    console.log('chrome', chrome)
    chrome?.storage?.local.get(STORAGE_KEY).then((scenes) => {
      console.log('scenes:', scenes)
    })
  }, [])

  return (
    <LayoutDiv>
      <ToolbarContainerDiv>
        <Toolbar />
      </ToolbarContainerDiv>
      {/* <TabContext.Provider value={{ currentTab, setCurrentTab }}> */}
        <ListContainerDiv>
          
        </ListContainerDiv>
        {/* <BottomTabContainerDiv>
          <BottomTab />
        </BottomTabContainerDiv>
      </TabContext.Provider> */}
    </LayoutDiv>
  )
}
