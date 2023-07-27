import { useEffect, useState } from "react"
import styled from "styled-components"
import Toolbar from "./components/Toolbar"
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material"

enum Mode {
  Create,
  Edit,
  List
}

const LayoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 360px;
  width: 400px;
  border-radius: 12px;
  border: 1px solid pink;
  padding: 8px;
`

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

const TemplateDescriptionSpan = styled.span`
  color: #ccc;
`

const TruncateSpan = styled.span`
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default function Main() {
  const mock: Scene[] = [{
    id: Symbol(),
    promptTemplate: '模板 - 🐱',
    title: '🐱🐱🐱🐱🐱'
  }, {
    id: Symbol(),
    promptTemplate: '模板 - 🐶',
    title: '🐶🐶🐶🐶🐶'
  }, {
    id: Symbol(),
    promptTemplate: '模板 - 🐯',
    title: '🐯🐯🐯🐯🐯'
  }, {
    id: Symbol(),
    promptTemplate: '模板 - 🐼',
    title: '🐼🐼🐼🐼🐼'
  }, {
    id: Symbol(),
    promptTemplate: '模板 - 🐲',
    title: '🐲🐲🐲🐲🐲'
  }]
  
  const [sceneList, setSceneList] = useState<Scene[]>(mock)
  const [checkedList, setCheckedList] = useState<Scene[]>([])

  useEffect(() => {
    chrome?.storage?.local.get("scenes").then((data) => {
      setSceneList(data.scenes || [])
    })
  }, [])

  const handleToggle = (scene: Scene) => {
    const index = checkedList.indexOf(scene)
    console.log('index', index)
    if (index !== -1) {
      checkedList.splice(index, 1)
    } else {
      checkedList.push(scene)
    }
    setCheckedList([...checkedList])
  }

  const [mode, setMode] = useState<Mode> (Mode.List)

  return (
    <LayoutDiv>
      <ToolbarContainerDiv>
        <Toolbar />
      </ToolbarContainerDiv>
      <ListContainerDiv>
        {sceneList.map((scene, sceneIndex) => (
          <ListItemButton
            dense
            component="li"
            key={sceneIndex}
            onClick={() => handleToggle(scene)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checkedList.includes(scene)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <TruncateSpan title={scene.title}>{scene.title}</TruncateSpan>
              }
              secondary={
                <>
                  <TemplateDescriptionSpan title={scene.promptTemplate}>
                    {scene.promptTemplate}
                  </TemplateDescriptionSpan>
                </>
              }
            />
          </ListItemButton>
        ))}
      </ListContainerDiv>
    </LayoutDiv>
  )
}
