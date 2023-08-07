const STORAGE_KEY = 'templates'

chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.type == "fill") {
      updateTextareaValue(request.data.template)
    }
  }
);

window.onload = function () {
  suggestionInitial()
}

function suggestionInitial(isRecursion: boolean = false) {
  const promptTextarea: HTMLTextAreaElement | null = document.querySelector("#prompt-textarea")

  if (!promptTextarea || !promptTextarea.parentElement) return

  const suggestionContainer = document.createElement('div')
  suggestionContainer.id = 'suggestion-container'
  promptTextarea.parentElement.appendChild(suggestionContainer)
  hiddenSuggestion()
  const observer = new MutationObserver(() => {
    const target = document.querySelector('#suggestion-switch')
    if (!target) {
      !isRecursion && suggestionInitial(true)
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  const suggestionSwitch = document.createElement('div')
  suggestionSwitch.id = 'suggestion-switch'
  suggestionSwitch.appendChild(createRingDiv())
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
      if (list.length === 0) {
        window.alert('No template found. Please create one.')
      }
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
      padding-left: 36px;
    }
    #suggestion-switch {
      position: absolute;
      left: 16px;
      top: 16px;
      cursor: pointer;
    }
    #prompt-textarea:has(+ div span button.btn[aria-label="Upload file"]) {
      padding-left: 64px;
    }
    #prompt-textarea+div:has(span button.btn[aria-label="Upload file"]) {
      left: 52px;
    }
    #suggestion-container {
      position: absolute;
      transform: translateY(-100%);
      top: -8px;
      background: rgba(255,255,255,0.6);
      box-shadow: 0 0 transparent, 0 0 transparent, 0 0 15px rgba(0,0,0,0.1);
      border: 1px solid rgba(0,0,0,0.1);
      width: 100%;
      right: 0;
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
      background: rgba(0,0,0,0.1);
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
      background-color: rgba(255,255,255, 1);
    }
    #prompt-template-toggle {
      --animation-color: rgba(128, 128, 128, 0.5);
      height: 24px;
      width: 24px;
      border-radius: 50%;
      border: 2px solid grey;
      animation: breathing 2s infinite;
      transition: 300ms;
    }
    #prompt-template-toggle:hover {
      border-color: rgba(171, 104, 255, 0.8);
      --animation-color: rgba(171, 104, 255, 0.8);
    }
    @keyframes breathing {
      0% { box-shadow: 0 0 0 0 var(--animation-color); }
      100% { box-shadow: 0 0 0 14px rgba(128, 128, 128, 0); }
    }
    @media (prefers-color-scheme: dark) {
      #prompt-suggestion.chatgpt-template-prompt-suggestion li:hover  {
        background-color: rgba(255,255,255, 0.1);
      }
      #prompt-suggestion.chatgpt-template-prompt-suggestion li::after {
        background: rgba(255,255,255,0.1);
      }
      #suggestion-container {
        background: rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
      }
    }
    @media (prefers-color-scheme: light) {
      #prompt-suggestion.chatgpt-template-prompt-suggestion li:hover  {
        background-color: rgba(0,0,0, 0.2);
      }
      #prompt-suggestion.chatgpt-template-prompt-suggestion li::after {
        background: rgba(0,0,0,0.1);
      }
      #suggestion-container {
        background: rgba(255,255,255,0.6);
        border: 1px solid rgba(0,0,0,0.1);
      }
    }
  `
  document.head.appendChild(style)
}

function createRingDiv() {
  const div = document.createElement("div");
  div.id = "prompt-template-toggle"
  return div;
}
