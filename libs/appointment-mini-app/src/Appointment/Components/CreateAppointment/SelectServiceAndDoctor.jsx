import { View, Text } from 'react-native';
import React from 'react';
import { Actionsheet } from 'native-base';
import { SelectedPackageServices } from '@mobile-nx-apps/service-mini-app';

const SelectServiceAndDoctor = ({
  onClose,
  isOpen,
  selectService,
  services,
}) => {
  return (
    <Actionsheet width={'100%'} onClose={onClose} isOpen={isOpen}>
      <Actionsheet.Content>
        {/* <SelectedPackageServices
          selectService={selectService}
          services={services}
          isOpen={isOpen}
          onClose={onClose}
        /> */}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SelectServiceAndDoctor;
