import { View, Text, Actionsheet } from 'native-base';
import React, { useEffect, useState } from 'react';
import { AllServicesSelect } from '@mobile-nx-apps/service-mini-app';
import { useSelector } from 'react-redux';

const SelectService = ({ isOpen, onClose, selectService }) => {
  useEffect(() => {
    setselectedProvider('');
    setselectedProvider(AppointmentStore?.body?.provider);
  }, [selectedProvider]);
  const AppointmentStore = useSelector((state) => state.AppointmentStore);
  const [selectedProvider, setselectedProvider] = useState(
    AppointmentStore?.body?.provider
  );
  return (
    <Actionsheet width={'100%'} onClose={onClose} isOpen={isOpen}>
      <Actionsheet.Content>
        <AllServicesSelect
          selectedProvider={selectedProvider}
          selectService={selectService}
        />
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SelectService;
