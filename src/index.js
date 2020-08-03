import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';

const { persistor, store } = configureStore()


ReactDOM.render(
  <React.StrictMode>
  	<Provider store={store} >
	  	<BrowserRouter>
	  		<PersistGate 
  			persistor={persistor} 
  			loading={<h1>store loading</h1>}
  			>
	    		<App />
	    	</PersistGate>
	    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
