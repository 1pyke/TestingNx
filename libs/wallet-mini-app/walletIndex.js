import { NativeBaseProvider } from 'native-base';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './src/App';
import feature1Slice from './src/Features/Feature1/feature1-store';

//configure store here

const store = configureStore({
  reducer: {
    slice: feature1Slice,
  },
});

function WalletIndex(params) {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <App />
      </NativeBaseProvider>
    </Provider>
  );
}
export default WalletIndex;
