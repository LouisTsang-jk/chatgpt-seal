const STORAGE_KEY = 'templates'

window.onload = function () {
  suggestionInitial()
}

function suggestionInitial() {
  const promptTextarea: HTMLTextAreaElement | null = document.querySelector("#prompt-textarea")

  if (!promptTextarea || !promptTextarea.parentElement) return

  const suggestionContainer = document.createElement('div')
  suggestionContainer.id = 'suggestion-container'
  promptTextarea.parentElement.appendChild(suggestionContainer)

  const suggestionSwitch = document.createElement('div')
  suggestionSwitch.id = 'suggestion-switch'
  suggestionSwitch.appendChild(createRingSVG())
  // suggestionSwitch.innerText = 'Insert'
  suggestionSwitch.onclick = (e: Event) => {
    e.preventDefault()
    const container: HTMLDivElement | null = document.querySelector('#suggestion-container')
    if (!container) return
    if (container.style.visibility === 'visible') {
      hiddenSuggestion()
    } else {
      refreshSuggestion()
    }
  }
  promptTextarea.parentElement.insertBefore(suggestionSwitch, promptTextarea)

  // promptTextarea.addEventListener('input', (event: Event) => {
  //   const target = event.target as HTMLTextAreaElement;
  //   if (target.value.slice(-1) === '/') {
  //     showSuggestion(promptTextarea, suggestionContainer).then((suggestionElement) => {
  //       currentSuggestionElement = suggestionElement
  //       suggestionContainer.appendChild(suggestionElement)
  //     })
  //   }
  //   if (target.value.slice(-1) !== '/' && currentSuggestionElement && suggestionContainer.contains(currentSuggestionElement)) {
  //     suggestionContainer.removeChild(currentSuggestionElement)
  //     currentSuggestionElement = null
  //   }
  // });

  styleInitial()
}

function hiddenSuggestion() {
  const container: HTMLDivElement | null = document.querySelector('#suggestion-container')
  if (container) {
    container.style.visibility = 'hidden'
  }
}

function removeChildNode(root: HTMLDivElement) {
  while (root.firstChild) {
    root.removeChild(root.firstChild)
  }
}

function refreshSuggestion() {
  // TODO显示suggestion-container
  const container: HTMLDivElement | null = document.querySelector('#suggestion-container')
  if (!container) return
  removeChildNode(container)
  container.style.visibility = 'visible'
  // TODO 重新渲染suggestion
  loadSuggestion(container)
}

function loadSuggestion(container: HTMLElement) {
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
        updateTextareaValue(list[+index].body)
        hiddenSuggestion()
      })
      container.appendChild(ul)
      resolve(ul)
    })
  })
}

function updateTextareaValue(value: string) {
  const target: HTMLTextAreaElement | null = document.querySelector("#prompt-textarea")
  if (!target) return
  if (target.selectionStart || +target.selectionStart === 0) {
    const startPos = target.selectionStart;
    const endPos = target.selectionEnd;
    target.value = target.value.substring(0, startPos) + value + target.value.substring(endPos, target.value.length);
  } else {
    target.value += target;
  }
  const event = new Event('input', {
    'bubbles': true,
    'cancelable': true
  });
  target.dispatchEvent(event);
}

function styleInitial() {
  const styleId = 'prompt-suggestion-style'
  if (document.querySelector(styleId)) return
  const style = document.createElement('style')
  style.id = styleId
  style.innerHTML = `
    #prompt-textarea {
      padding-left: 40px;
    }
    #suggestion-switch {
      position: absolute;
      left: 16px;
      cursor: pointer;
    }
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

function createRingSVG() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", "24");
  svg.setAttribute("width", "24");
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "12");
  circle.setAttribute("cy", "12");
  circle.setAttribute("r", "10");
  circle.setAttribute("stroke", "grey");
  circle.setAttribute("stroke-width", "4");
  circle.setAttribute("fill", "none");
  svg.appendChild(circle);
  return svg
}

// <svg height="24" width="24">
//     <circle cx="12" cy="12" r="10" stroke="grey" stroke-width="4" fill="none"></circle>
// </svg>