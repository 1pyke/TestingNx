import { View, Text } from 'react-native';
import React from 'react';
import { Actionsheet } from 'native-base';
import { PackageDetailsSelect } from '@mobile-nx-apps/service-mini-app';

const PackageDetailsModal = ({ onClose, isOpen, PackageDetail }) => {
  return (
    <Actionsheet width={'100%'} onClose={onClose} isOpen={isOpen}>
      <Actionsheet.Content>
        {/* <PackageDetailsSelect
          item={PackageDetail}
          isOpen={isOpen}
          onClose={onClose}
        /> */}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default PackageDetailsModal;
