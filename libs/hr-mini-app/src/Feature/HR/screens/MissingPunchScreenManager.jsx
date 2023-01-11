import { View } from 'react-native';
import React from 'react';
import DisplayAllMissingPunchRequests from '../components/modals/DisplayAllMissingPunchRequests';
const MissingPunchScreenManager = () => {
  return (
    <View>
      <DisplayAllMissingPunchRequests />
    </View>
  );
};

export default MissingPunchScreenManager;
