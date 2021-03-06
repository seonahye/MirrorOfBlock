/* globals browser, ExtOption */

const elements = {
  outlineBlockUser: document.getElementById('outlineBlockUser'),
  enableBlockReflection: document.getElementById('enableBlockReflection'),
  blockMutedUser: document.getElementById('blockMutedUser')
}

function saveOption () {
  const option = {}
  for (const key of Object.keys(elements)) {
    option[key] = elements[key].checked
  }
  return ExtOption.save(option)
}

async function loadOption () {
  const option = await ExtOption.load()
  for (const key of Object.keys(elements)) {
    elements[key].disabled = false
    elements[key].checked = option[key]
  }
}

function displayVersion () {
  const elem = document.getElementById('version')
  const manifest = browser.runtime.getManifest()
  elem.textContent = manifest.version
}

function init () {
  loadOption()
  for (const input of document.querySelectorAll('.field input')) {
    input.addEventListener('change', () => {
      saveOption()
    })
  }
  displayVersion()
}

document.addEventListener('DOMContentLoaded', init)
