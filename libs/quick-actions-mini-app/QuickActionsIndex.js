import { NativeBaseProvider } from 'native-base';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import AuthStore from '@mobile-nx-apps/auth-store';
import dashboardActionsTemplatesStore from './src/Features/Feature1/feature1-store';
import App from './src/App';
import { useSelector } from 'react-redux';

//configure store here

const store = configureStore({
  reducer: {
    //put store slices here
    AuthStore,
    dashboardActionsTemplatesStore,
  },
});

export default function QuickActionsIndex(params) {
  return (
    // <Provider store={store}>
    <NativeBaseProvider>
      <App />
    </NativeBaseProvider>
    // </Provider>
  );
}
