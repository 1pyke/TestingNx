import { View, Platform } from 'react-native';
import React from 'react';
import {
  Actionsheet,
  Box,
  CheckIcon,
  Divider,
  Select,
  Text,
} from 'native-base';
const CalendarCardsModal = ({ isOpen, onClose }) => {
  const [position, setPosition] = React.useState('auto');
  return (
    <>
      {isOpen && (
        <Actionsheet
          hideDragIndicator={Platform.OS === 'ios' ? true : false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <Actionsheet.Content>
            <Text color={'#5F84A2'} fontSize={20}>
              Cancel Appointment
            </Text>
            <Divider borderColor="gray.300" />
            <Actionsheet.Item justifyContent={'center'} alignItems={'center'}>
              <Box width={'100%'}>
                <Text mb={3} color={'#5F84A2'}>
                  Caused By
                </Text>
                <Select
                  w={300}
                  selectedValue={position}
                  mx={{
                    base: 0,
                    md: 'auto',
                  }}
                  onValueChange={(nextValue) => setPosition(nextValue)}
                  _selectedItem={{
                    bg: 'cyan.600',
                    endIcon: <CheckIcon size={4} />,
                  }}
                  accessibilityLabel="Select a position for Menu"
                >
                  <Select.Item label="auto" value="auto" />
                  <Select.Item label="Top Left" value="top left" />
                  <Select.Item label="Top" value="top" />
                  <Select.Item label="Top Right" value="top right" />
                  <Select.Item label="Right Top" value="right top" />
                  <Select.Item label="Right" value="right" />
                  <Select.Item label="Right Bottom" value="right bottom" />
                  <Select.Item label="Bottom Left" value="bottom left" />
                  <Select.Item label="Left" value="left" />
                  <Select.Item label="Left Bottom" value="left bottom" />
                </Select>
              </Box>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      )}
    </>
  );
};
export default CalendarCardsModal;
