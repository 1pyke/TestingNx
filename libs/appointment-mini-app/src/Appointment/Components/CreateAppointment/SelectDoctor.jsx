import { View, Text, Actionsheet } from 'native-base';
import React from 'react';
import { AllDoctorsSelect } from '@mobile-nx-apps/provider-mini-app';

const SelectDoctor = ({ isOpen1, onClose1, SelecOnetDoctor }) => {
  return (
    <Actionsheet width={'100%'} onClose={onClose1} isOpen={isOpen1}>
      <Actionsheet.Content>
        <AllDoctorsSelect selectProvider={SelecOnetDoctor} />
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SelectDoctor;
