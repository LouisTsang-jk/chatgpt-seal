const STORAGE_KEY = 'scene'

interface Scene {
  id: Symbol
  title: string
  promptTemplate: string
}

console.log('Hello Content', chrome?.storage.local.get(STORAGE_KEY))

suggestionInitial()

function suggestionInitial() {
  const promptTextarea: HTMLTextAreaElement | null = document.querySelector("#prompt-textarea")

  if (!promptTextarea) return

  promptTextarea.addEventListener('input', (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    if (target.value.slice(-1) === '/' && promptTextarea.parentElement) {
      showSuggestion(promptTextarea.parentElement).then(suggestionElement => {
        console.log('show suggestion', suggestionElement);
      }) 
    }
  });

}

function showSuggestion (target: HTMLElement) {
  return new Promise((resolve) => {
    chrome?.storage.local.get(STORAGE_KEY).then((data) => {
      console.log('storage:', data)
      const list = (data.scene || []) as Scene[]
      const ul = document.createElement('ul')
      list.forEach((scene, sceneIndex) => {
        const li = document.createElement('li')
        li.innerText = `${scene.title}`
        li.setAttribute('index', `${sceneIndex}`)
        ul.appendChild(li)
      })
      ul.addEventListener('click', (evt: any) => {
        console.log('evt', evt)
      })
      target.appendChild(ul)
      resolve(ul)
    })
  })
}