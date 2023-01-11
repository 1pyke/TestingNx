import { NativeBaseProvider } from 'native-base';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';
import App from './src/App';
import hrStore from './src/Feature/HR/store-Hr';
import AuthStore from '@mobile-nx-apps/auth-store';
//configure store here
const store = configureStore({
  reducer: {
    //put store slices here
    hrStore: hrStore,
    AuthStore,
  },
});
export default function HRindex(params) {
  const auth = useSelector((state) => state.AuthStore);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <App auth={auth} />
      </NativeBaseProvider>
    </Provider>
  );
}
