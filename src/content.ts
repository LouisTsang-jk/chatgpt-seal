const STORAGE_KEY = 'scene'

interface Scene {
  id: string
  title: string
  promptTemplate: string
}

suggestionInitial()

function suggestionInitial() {
  const promptTextarea: HTMLTextAreaElement | null = document.querySelector("#prompt-textarea")

  if (!promptTextarea) return

  // let suggestionElement = null

  promptTextarea.addEventListener('input', (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    if (target.value.slice(-1) === '/' && promptTextarea.parentElement) {
      showSuggestion(promptTextarea).then(suggestionElement => {
        console.log('show suggestion', suggestionElement);
        // suggestionElement = suggestionElement
      })
    }
    // if (target.value.slice(-1) !== '/' ) {

    // }
  });

}

function showSuggestion(target: HTMLTextAreaElement) {
  return new Promise((resolve) => {
    chrome?.storage.local.get(STORAGE_KEY).then((data) => {
      console.log('storage:', data)
      const list = (data.scene || []) as Scene[]
      const ul = document.createElement('ul')
      ul.id = 'prompt-suggestion'
      ul.className = 'chatgpt-scene-prompt-suggestion'
      list.forEach((scene, sceneIndex) => {
        const li = document.createElement('li')
        li.innerText = `${scene.title}`
        li.setAttribute('index', `${sceneIndex}`)
        ul.appendChild(li)
      })
      ul.addEventListener('click', (evt: MouseEvent) => {
        const liTarget = evt.target as HTMLLIElement
        if (!liTarget) return
        const index = liTarget.getAttribute('index')
        if (index === null || typeof (+index) !== 'number') return
        target.value = target.value.replace(/\/$/gm, list[+index].promptTemplate)
        target.parentElement?.removeChild(ul)
      })
      target.parentElement?.appendChild(ul)
      resolve(ul)
    })
  })
}

styleInitial()

function styleInitial() {
  const style = document.createElement('style')
  style.innerHTML = `
    #prompt-suggestion.chatgpt-scene-prompt-suggestion li {
      cursor: pointer;
      padding: 4px 8px;
    }
    #prompt-suggestion.chatgpt-scene-prompt-suggestion li:hover  {
      background-color: rgba(236,236,241, 1);
    }
  `
  document.head.appendChild(style)
}