import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';
import { Index } from '@mobile-nx-apps/clinc-container-v1'; // clinc mini-app
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
function main(params) {
  return <Index />;
}
registerRootComponent(main);
