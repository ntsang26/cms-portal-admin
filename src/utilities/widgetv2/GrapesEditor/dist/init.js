import {
  assetManager,
  blockManager,
  deviceManager,
  panels,
  storageManager,
  styleManager,
  canvasCss,
} from './config'

export default {
  container: '#gjs',
  fromElement: true,
  height: '100%',
  width: 'auto',
  layerManager: {
    appendTo: '.layers-container',
  },
  panels: panels,
  allowScripts: 1,
  traitManager: {
    appendTo: '.traits-container',
  },
  selectorManager: {
    componentFirst: 1,
    appendTo: '.styles-container',
  },
  storageManager,
  blockManager,
  assetManager,
  deviceManager,
  styleManager,
  canvasCss,
  plugins: [],
  cors: {
    enabled: true,
    origin: "http://localhost:3001",
  },
  params:{
    'Access-Control-Allow-Origin':'*',
  },
  canvas: {
    styles: [
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
      'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css'
    ],
    scripts: ['https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js'],
  },
}
