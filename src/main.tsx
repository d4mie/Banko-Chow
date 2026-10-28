import '@fontsource-variable/fredoka'
import '@fontsource-variable/outfit'
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { initNative } from './lib/native'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

void initNative()
