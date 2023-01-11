import { registerRootComponent } from 'expo';
import { NativeBaseProvider } from 'native-base';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './src/App';
//import reducers

//configure store here
import { combineReducers } from 'redux';
import { feature1Reducer } from './src/Features/Feature1/feature1-store';
const store = configureStore({
  reducer: { feature1: feature1Reducer },
});

function Index(params) {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <App />
      </NativeBaseProvider>
    </Provider>
  );
}

registerRootComponent(Index);
