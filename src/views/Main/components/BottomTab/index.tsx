import { Tab, Tabs } from "@mui/material"
import { useContext } from "react"
import { TabContext } from "../.."

export default function BottomTab() {
  const { currentTab, setCurrentTab } = useContext(TabContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('event', event)
    setCurrentTab(newValue)
  }

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
      </Tabs>
    </>
  )
}
