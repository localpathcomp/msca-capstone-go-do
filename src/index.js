import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './configureStore'
//import rootReducer from './reducers/rootReducer'
import * as serviceWorker from './serviceWorker'
import WebFont from 'webfontloader'

//const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
WebFont.load({
  google: {
    families: ['Leckerli One:400', 'cursive','Raleway:300,600', 'sans-serif']
  }
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
