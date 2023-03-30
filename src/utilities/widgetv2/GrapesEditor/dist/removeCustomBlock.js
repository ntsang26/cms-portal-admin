import _ from 'lodash'

export default (editor, grapes_blocks = [], pre_grapes_block = []) => {
  try {
    const status = grapes_blocks.length - pre_grapes_block.length >= 0 // true is add, false is remote
    const removedBlocks = grapes_blocks.length
      ? _.differenceBy(grapes_blocks, pre_grapes_block, 'id')
      : pre_grapes_block
    if (!status) editor.Blocks.remove(removedBlocks[0]?.id)
  } catch (error) {
    console.log(error)
  }
}
