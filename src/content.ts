const STORAGE_KEY = 'templates'

suggestionInitial()

function suggestionInitial() {
  const promptTextarea: HTMLTextAreaElement | null = document.querySelector("#prompt-textarea")

  if (!promptTextarea) return

  let currentSuggestionElement: HTMLElement | null = null

  promptTextarea.addEventListener('input', (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    if (target.value.slice(-1) === '/' && promptTextarea.parentElement) {
      showSuggestion(promptTextarea).then((suggestionElement) => {
        currentSuggestionElement = suggestionElement
        promptTextarea.parentElement?.appendChild(suggestionElement)
      })
    }
    if (target.value.slice(-1) !== '/' && currentSuggestionElement ) {
      promptTextarea.parentElement?.removeChild(currentSuggestionElement)
      currentSuggestionElement = null
    }
  });

}

function showSuggestion(target: HTMLTextAreaElement) {
  return new Promise<HTMLElement>((resolve) => {
    chrome?.storage.local.get(STORAGE_KEY).then((data) => {
      const list = (data[STORAGE_KEY] || []) as Template[]
      const ul = document.createElement('ul')
      ul.id = 'prompt-suggestion'
      ul.className = 'chatgpt-template-prompt-suggestion'
      list.forEach((template, templateIndex) => {
        const li = document.createElement('li')
        li.innerText = `${template.title}`
        li.setAttribute('index', `${templateIndex}`)
        ul.appendChild(li)
      })
      ul.addEventListener('click', (evt: MouseEvent) => {
        const liTarget = evt.target as HTMLLIElement
        if (!liTarget) return
        const index = liTarget.getAttribute('index')
        if (index === null || typeof (+index) !== 'number') return
        target.value = target.value.replace(/\/$/gm, list[+index].body)
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
    #prompt-suggestion.chatgpt-template-prompt-suggestion li {
      cursor: pointer;
      padding: 4px 8px;
    }
    #prompt-suggestion.chatgpt-template-prompt-suggestion li:hover  {
      background-color: rgba(236,236,241, 1);
    }
  `
  document.head.appendChild(style)
}