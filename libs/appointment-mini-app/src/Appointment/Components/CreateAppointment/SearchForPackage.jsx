import { View, Text, Actionsheet } from 'native-base';
import React from 'react';
import { AllPackagesSelect } from '@mobile-nx-apps/service-mini-app';

const SearchForPackage = ({ isOpen, onClose, selectPackage }) => {
  return (
    <Actionsheet width={'100%'} onClose={onClose} isOpen={isOpen}>
      <Actionsheet.Content>
        <AllPackagesSelect selectPackage={selectPackage} />
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SearchForPackage;
