import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider>
    <App />
  </Provider>
)
