// =============================================================
// main.jsx — React Application Entry Point
// =============================================================
// This is the very first file executed when the React app loads.
// It mounts the root <App /> component into the #root div defined
// in index.html. ReactDOM.createRoot() uses React 18's concurrent
// rendering API for better performance.
// =============================================================

import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Mount the App component into the root DOM node
ReactDOM.createRoot(document.getElementById('root')).render(

    <App />

)
