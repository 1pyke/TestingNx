import { NativeBaseProvider } from 'native-base';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import AppointmentStore from './src/Appointment/store-Appointment';

import App from './src/App';

//configure store here

const store = configureStore({
  reducer: {
    AppointmentStore,
  },
});

export default function AppointmenIndex(params) {
  return (
    // <Provider store={store}>
    <NativeBaseProvider>
      <App />
    </NativeBaseProvider>
    // </Provider>
  );
}
