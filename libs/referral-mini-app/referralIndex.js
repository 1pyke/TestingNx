import referral from './src/Features/Feature1/referralSlice-store';
import { NativeBaseProvider } from 'native-base';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import AuthStore, { reducers } from '@mobile-nx-apps/auth-store';
import App from './src/App';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

//configure store here

const store = configureStore({
  reducer: {
    referral,
    AuthStore,
  },
});
function ReferralIndex(params) {
  const auth = useSelector((state) => state.AuthStore);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <App auth={auth} />
      </NativeBaseProvider>
    </Provider>
  );
}
export default ReferralIndex;
