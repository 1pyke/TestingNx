//@ts-nocheck
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Modal,
  Pressable,
  Text,
  View,
} from 'native-base';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';

const FilterModal = ({ open, setOpen, placement }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
  };
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      safeAreaTop={true}
      alignSelf={'center'}
      flex={1}
    >
      <Box
        borderTopRightRadius={20}
        borderTopLeftRadius={20}
        bg={'#fff'}
        justifyContent={'center'}
        style={styles.bottom}
      >
        <HStack w={'100%'} p={4}>
          <View>
            <Heading fontSize={'2xl'}>Filter By</Heading>
            <Heading fontSize={'lg'} mt={2}>
              Transaction Date
            </Heading>
          </View>
        </HStack>
        <HStack w={'100%'} p={4}>
          <FormControl w={'100%'}>
            <Pressable onPress={showDatepicker} _pressed={{ bg: 'gray.100' }}>
              <Input
                w={'100%'}
                InputRightElement={
                  <Button
                    onPress={showDatepicker}
                    bg={'transparent'}
                    _pressed={{ bg: 'transparent' }}
                  >
                    <Text fontSize={'xl'}>📅</Text>
                  </Button>
                }
                placeholder="Select Date"
                isReadOnly={true}
                value={date.toString()}
              />
            </Pressable>
          </FormControl>
        </HStack>
        <HStack w={'100%'} p={4}>
          <Button
            bg={'#5F84A2'}
            w={'100%'}
            borderRadius={10}
            onPress={() => setOpen(false)}
          >
            <Text fontSize={'lg'} color={'#fff'}>
              Filter
            </Text>
          </Button>
        </HStack>
        <HStack w={'100%'} p={4}>
          <Button
            variant={'outline'}
            w={'100%'}
            borderRadius={10}
            onPress={() => setOpen(false)}
          >
            <Text fontSize={'lg'} color={'#A1A1A1'}>
              Cancel
            </Text>
          </Button>
        </HStack>
      </Box>
    </Modal>
  );
};

const styles = {
  bottom: {
    marginTop: 'auto',
    width: '100%',
    // height:'100%'
  },
};

export default FilterModal;
