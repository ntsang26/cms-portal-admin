import React, { useEffect, useState } from 'react'
import {
  addPanels,
  addCommands,
  addTraits,
  init,
  closeCategory,
  addCustomBlocks,
  removeCustomBlock,
} from './dist'
import grapesjs from 'grapesjs'
// import GrapesAssets from './GrapesAssets'
import { api, helper } from 'services'
import 'grapesjs/dist/css/grapes.min.css'
import './grapesjs.scss'

const GrapesEditor = (props) => {
  const [editor, setEditor] = useState(null)
  const [assets, setAssets] = useState(null)
  const [loaded, setLoaded] = useState(0)
  const [current, setCurrent] = useState(null)
  const [customBlocks, setCustomBlocks] = useState([])

  const { onChange, value, label } = props

  useEffect(() => {
    if (current) onChange(current)
  }, [current])

  useEffect(() => {
    if (!editor) {
      if (!assets) handleAssets.get()
      else {
        init.assetManager.assets = assets
        init.storageManager.options.local.onStore = (data, e) => {
          const ctx = {
            html: e.getHtml(),
            css: e.getCss(),
            js: e.getJs(),
            components: e.getComponents(),
            style: e.getStyle(),
          }
          setCurrent(ctx)
          return data
        }
        const edit = grapesjs.init(init)
        addCommands(edit)
        addTraits(edit)
        addPanels(edit)
        addCustomBlocks(edit)
        closeCategory(edit)
        setEditor(edit)
      }
    }
  }, [assets])

  useEffect(() => {
    if (editor && value && !loaded) {
      console.log('loaded components', value)
      editor.setComponents(value.components)
      editor.setStyle(value.style)
      setCurrent(value)
      setLoaded(true)
    }
  }, [editor, value])

  // useEffect(() => {
  //   if (editor && grapes_blocks && grapes_blocks?.length) {
  //     addCustomBlocks(editor, grapes_blocks)
  //     setCustomBlocks(grapes_blocks)
  //     removeCustomBlock(editor, grapes_blocks, customBlocks)
  //   }
  // }, [grapes_blocks, editor])

  const handleAssets = {
    get: async () => {
      try {
        let rs = await api.getAssets()
        if (!rs || rs.errorCode !== 0) return helper.toast('error', 'Get assets fail')
        setAssets(rs.data.map((item) => item.url))
      } catch (error) {
        console.log(error)
      }
    },
  }

  return (
    <>
      {label ? <label htmlFor={label}>{`${label}:`}</label> : null}
      <div id='grapesjs-main'>
        <div className='panel__top'>
          <div className='panel__devices'></div>
          <div className='panel__options'>
            <div className='panel__basic-actions'></div>
            <div className='panel__switcher'></div>
          </div>
        </div>
        <div className='editor-row'>
          <div className='editor-canvas'>
            <div id='gjs'></div>
          </div>
          <div className='panel__right'>
            <div className='layers-container'></div>
            <div className='styles-container'></div>
            <div className='traits-container'></div>
            <div className='blocks-container'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GrapesEditor
