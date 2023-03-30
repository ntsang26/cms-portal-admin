import { CCommands } from './constants'

export default (editor) => {
  const { Commands } = editor
  const getRowEl = (editor) => {
    const row = editor.getContainer().closest('.editor-row')
    return [
      row.querySelector('.layers-container'),
      row.querySelector('.styles-container'),
      row.querySelector('.traits-container'),
      row.querySelector('.blocks-container'),
    ]
  }
  const commands = [
    CCommands.showLayers,
    CCommands.showStyles,
    CCommands.showTraits,
    CCommands.showBlocks,
  ]
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i]
    Commands.add(command, {
      stop(editor, sender) {
        getRowEl(editor)[i].style.display = 'none'
      },
      run(editor, sender) {
        getRowEl(editor)[i].style.display = 'block'
      },
    })
  }

  Commands.add(CCommands.setDeviceDesktop, {
    run: (editor) => editor.setDevice('Desktop'),
  })
  Commands.add(CCommands.setDeviceTablet, {
    run: (editor) => editor.setDevice('Tablet'),
  })
  Commands.add(CCommands.setDeviceMobile, {
    run: (editor) => editor.setDevice('Mobile'),
  })
  Commands.add(CCommands.clearCanvas, {
    run: (editor) => {
      editor.DomComponents.clear()
      editor.CssComposer.clear()
    },
  })
  CImportConfig.modalImportContent = (editor) => editor.getHtml()
  Commands.add(CCommands.importTemplate, openImport(editor, CImportConfig))
}

const openImport = (editor, config) => {
  let pfx = editor.getConfig().stylePrefix
  let modal = editor.Modal
  let cmdm = editor.Commands
  let htmlCodeViewer = editor.CodeManager.getViewer('CodeMirror').clone()
  let cssCodeViewer = editor.CodeManager.getViewer('CodeMirror').clone()
  let pnm = editor.Panels
  let container = document.createElement('div')
  let htmlContainer = document.createElement('div')
  let cssContainer = document.createElement('div')
  container.className = 'gjs-export-dl'
  htmlContainer.className = 'gjs-cm-editor-c'
  cssContainer.className = 'gjs-cm-editor-c'
  let btnEdit = document.createElement('button')

  htmlCodeViewer.set({
    codeName: 'htmlmixed',
    readOnly: 0,
    theme: 'hopscotch',
    autoBeautify: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    styleActiveLine: true,
    smartIndent: true,
    indentWithTabs: true,
  })

  cssCodeViewer.set({
    codeName: 'css',
    readOnly: 0,
    theme: 'hopscotch',
    autoBeautify: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    styleActiveLine: true,
    smartIndent: true,
    indentWithTabs: true,
  })

  btnEdit.innerHTML = 'Save'
  btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import'
  btnEdit.onclick = function () {
    let html = htmlCodeViewer.editor.getValue()
    let css = cssCodeViewer.editor.getValue()
    editor.DomComponents.getWrapper().set('content', '')
    editor.setComponents(html.trim())
    editor.setStyle(css)
    modal.close()
  }

  return {
    run(editor, sender) {
      // sender && sender.set('active', 0)
      console.log(sender)
      let htmlViewer = htmlCodeViewer.editor
      let cssViewer = cssCodeViewer.editor
      modal.setTitle('Edit code')
      if (!htmlViewer && !cssViewer) {
        let txtarea = document.createElement('textarea')
        let cssarea = document.createElement('textarea')
        htmlContainer.appendChild(txtarea)
        cssContainer.appendChild(cssarea)
        container.appendChild(htmlContainer)
        container.appendChild(cssContainer)
        container.appendChild(btnEdit)
        htmlCodeViewer.init(txtarea)
        cssCodeViewer.init(cssarea)
        htmlViewer = htmlCodeViewer.editor
        cssViewer = cssCodeViewer.editor
      }
      let InnerHtml = editor.getHtml()
      let Css = editor.getCss()
      modal.setContent('')
      modal.setContent(container)
      htmlCodeViewer.setContent(InnerHtml)
      cssCodeViewer.setContent(Css)
      modal.open().onceClose(() => editor.stopCommand(CCommands.importTemplate))
      htmlViewer.refresh()
      cssViewer.refresh()
    },

    stop() {
      modal.close()
    },
  }
}

const CImportConfig = {
  modalImportTitle: 'Import',
  modalImportButton: 'Import',
  modalImportLabel: '',
  modalImportContent: '',
  importViewerOptions: {},
  textCleanCanvas: 'Are you sure you want to clear the canvas?',
  showStylesOnChange: true,
  useCustomTheme: true,
}
