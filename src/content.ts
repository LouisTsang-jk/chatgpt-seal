const STORAGE_KEY = 'templates'

suggestionInitial()

function suggestionInitial() {
  const promptTextarea: HTMLTextAreaElement | null = document.querySelector("#prompt-textarea")

  if (!promptTextarea || !promptTextarea.parentElement) return

  let suggestionContainer = document.createElement('div')
  suggestionContainer.id = 'suggestion-container'
  promptTextarea.parentElement.appendChild(suggestionContainer)

  let currentSuggestionElement: HTMLElement | null = null

  promptTextarea.addEventListener('input', (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    if (target.value.slice(-1) === '/') {
      showSuggestion(promptTextarea, suggestionContainer).then((suggestionElement) => {
        currentSuggestionElement = suggestionElement
        suggestionContainer.appendChild(suggestionElement)
      })
    }
    if (target.value.slice(-1) !== '/' && currentSuggestionElement && suggestionContainer.contains(currentSuggestionElement)) {
      suggestionContainer.removeChild(currentSuggestionElement)
      currentSuggestionElement = null
    }
  });

  styleInitial()
}

function showSuggestion(target: HTMLTextAreaElement, container: HTMLElement) {
  return new Promise<HTMLElement>((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (data) => {
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
        const event = new Event('input', {
          'bubbles': true,
          'cancelable': true
        });
        target.dispatchEvent(event);
        if (container.contains(ul)) {
          container.removeChild(ul)
        }
      })
      container.appendChild(ul)
      resolve(ul)
    })
  })
}

function styleInitial() {
  const styleId = 'prompt-suggestion-style'
  if (document.getElementById(styleId)) return
  const style = document.createElement('style')
  style.id = styleId
  style.innerHTML = `
    #suggestion-container {
      position: absolute;
      transform: translateY(-100%);
      top: -8px;
      background: rgba(200,200,200,0.4);
      width: 100%;
      left: 0;
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }
    #prompt-suggestion.chatgpt-template-prompt-suggestion li {
      position: relative;
      cursor: pointer;
      padding: 4px 8px;
    }
    #prompt-suggestion.chatgpt-template-prompt-suggestion li:first-child {
      padding: 8px 8px 4px 8px;
      border-radius: 12px 12px 0 0;
    }
    #prompt-suggestion.chatgpt-template-prompt-suggestion li:last-child {
      padding: 4px 8px 8px 8px;
      border-radius: 0 0 12px 12px;
    }
    #prompt-suggestion.chatgpt-template-prompt-suggestion li::after {
      content: "";
      width: 100%;
      height: 1px;
      background: rgba(255,255,255,0.8);
      display: inline-block;
      bottom: 0;
      position: absolute;
      left: 0;
    }
    #prompt-suggestion.chatgpt-template-prompt-suggestion li:last-child::after {
      content: "";
      opacity: 0;
    }
    #prompt-suggestion.chatgpt-template-prompt-suggestion li:hover  {
      background-color: rgba(236,236,241, 1);
    }
  `
  document.head.appendChild(style)
}
