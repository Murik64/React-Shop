import { createRoot } from 'react-dom/client'
import "./scss/app.scss";
import App from './App'
import { HashRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
)
