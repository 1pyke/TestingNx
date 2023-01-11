import { Provider } from 'react-redux';
import App from './src/App';
import { configureStore } from '@reduxjs/toolkit';
import billingReducer from './src/Feature/Billing/store-Billing';
import tasksReducer from './src/Feature/Tasks/store-tasks';
import notificationReducer from './src/Feature/Notification/store-notification';
import providerReducer from './src/Feature/Provider/store-provider';
import dashboardReducer from './src/Feature/Dashboard/store-dashboard';
import finalLayoutStore from './src/sharedComponents/FinalLayout/store-finalLayout';
import CiamStore from './src/Feature/CIAM/store-CIAM';
import searchStore from './src/Feature/Search/search-store.js';
import { NativeBaseProvider } from 'native-base';
import AuthStore from '@mobile-nx-apps/auth-store';
import { AppointmentStore } from '@mobile-nx-apps/appointment-mini-app';
import { dashboardActionsTemplatesStore } from '@mobile-nx-apps/quick-actions-mini-app';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const store = configureStore({
  reducer: {
    dashboardActionsTemplatesStore,
    AppointmentStore,
    billing: billingReducer,
    tasks: tasksReducer,
    notification: notificationReducer,
    provider: providerReducer,
    dashboard: dashboardReducer,
    finalLayoutStore: finalLayoutStore,
    ciamStore: CiamStore,
    searchStore: searchStore,
    AuthStore,
  },
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
export default Index;
