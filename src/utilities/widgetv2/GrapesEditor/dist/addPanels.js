import { CCommands, CMedia } from './constants'

export default (editor) => {
  const { Panels } = editor
  Panels.addPanel({
    id: 'panel-top',
    el: '.panel__top',
  })
  Panels.addPanel({
    id: 'basic-actions',
    el: '.panel__basic-actions',
    buttons: [
      {
        id: 'visibility',
        active: true,
        className: 'btn-toggle-borders',
        label: CMedia.visibility,
        command: CCommands.visibility,
      },
      {
        id: 'export',
        className: 'btn-open-export',
        label: CMedia.code,
        command: CCommands.exportTemplate,
        context: CCommands.exportTemplate,
      },
      {
        id: 'show-full',
        className: 'btn-show-full',
        label: CMedia.showFull,
        command: (editor) => {
          editor.stopCommand('fullscreen')
          editor.runCommand('fullscreen', { target: '#grapesjs-main' })
        },
      },
      {
        id: 'preview',
        className: 'btn-preview',
        label: CMedia.eye,
        command: (editor) => {
          editor.stopCommand('preview')
          editor.runCommand('preview', { target: '#grapesjs-main' })
        },
      },
      {
        id: 'clean-canvas',
        className: 'btn-clean-canvas',
        label: CMedia.trash,
        context: CCommands.clearCanvas,
        command(editor) {
          editor.runCommand(CCommands.clearCanvas)
        },
      },
      {
        id: 'show-undo',
        className: 'btn-show-undo',
        label: CMedia.undo,
        context: CCommands.showUndo,
        command(editor) {
          const um = editor.UndoManager
          um.undo()
        },
      },
      {
        id: 'show-redo',
        className: 'btn-show-redo',
        label: CMedia.redo,
        context: CCommands.showRedo,
        command(editor) {
          const um = editor.UndoManager
          um.redo()
        },
      },
      {
        id: 'import',
        className: 'btn-open-import',
        label: CMedia.import,
        command(editor) {
          editor.runCommand(CCommands.importTemplate)
        },
        context: CCommands.importTemplate,
      },
    ],
  })
}
