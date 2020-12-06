const { ipcRenderer: ipc, remote } = require('electron');
const { clipboard } = remote
const marked = require('marked')

const mainProcess = remote.require('./main')

const $ = selector => document.querySelector(selector)

const $markdownView = $('.raw-markdown')
const $htmlView = $('.rendered-html')
const $openFileButton = $('#open-file')
const $saveFileButton = $('#save-file')
const $copyHtmlButton = $('#copy-html')

const renderMarkdownToHtml = (markdown) => {
    const html = marked(markdown)
    $htmlView.innerHTML = html
  }

ipc.on('file-opened', (event, file, content) => {
    $markdownView.value = content
    renderMarkdownToHtml(content)
})

$markdownView.addEventListener('keyup', (event) => {
    const updatedContent = event.target.value
    renderMarkdownToHtml(updatedContent)
})

$openFileButton.addEventListener('click', () => {
    mainProcess.openFile()
  })

$copyHtmlButton.addEventListener('click', () => {
    const html= $htmlView.innerHTML
    clipboard.writeText(html)
})

$saveFileButton.addEventListener('click', () => {
    const html= $htmlView.innerHTML
    mainProcess.saveFile(html)
})
