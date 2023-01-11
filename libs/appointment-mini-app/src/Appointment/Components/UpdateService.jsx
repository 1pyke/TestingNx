import { View, Text, Actionsheet, HStack, Divider, Button } from 'native-base';
import React from 'react';

const UpdateService = ({ isOpen, onClose, details, setServices }) => {
  const filter = (item, index) => {
    const newService = [...details];
    if (item.value <= 1) {
      newService.splice(index, 1);
      // return service.filter((obj) => obj.id !== item.id);
    } else {
      newService[index].value--;
      // return service.map((obj) =>
      //   obj.id === item.id
      //     ? {
      //         ...obj,
      //         value: obj.value - 1,
      //       }
      //     : obj
      // );
    }
    return newService;
  };
  const addService = (item, index) => {
    const newService = [...details];
    newService[index].value++;

    return newService;
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <View>
          <Text fontSize={'md'} color={'#5F84A2'}>
            UpdateService
          </Text>
        </View>
        <Divider my={'2%'} />
        {details?.services.map((item, index) => (
          <HStack key={`${item.id}-${index}`} mb={'2 %'}>
            <Text fontSize={'xs'} color={'#5F84A2'}>
              {index + 1}{' '}
            </Text>
            <Text
              w={'20%'}
              numberOfLines={1}
              fontSize={'xs'}
              color={'rgba(0,0,0,0.4)'}
            >
              {' '}
              {item?.service?.serviceInfo?.name?.en}
            </Text>
            <Text ml={1} fontSize={'xs'} color={'rgba(0,0,0,0.4)'}>
              {' '}
              |
            </Text>
            <Text
              w={'10%'}
              numberOfLines={1}
              ml={1}
              fontSize={'xs'}
              color={'rgba(0,0,0,0.4)'}
            >
              {' '}
              {details.provider?.name?.en}
            </Text>
            <Text ml={1} fontSize={'xs'} color={'rgba(0,0,0,0.4)'}>
              {' '}
              |
            </Text>
            <Text
              w={'12%'}
              numberOfLines={1}
              ml={1}
              fontSize={'xs'}
              color={'rgba(0,0,0,0.4)'}
            >
              Room{item.room}
            </Text>
            <Text ml={1} fontSize={'xs'} color={'rgba(0,0,0,0.4)'}>
              {' '}
              |
            </Text>
            <Text
              w={'15%'}
              numberOfLines={1}
              ml={1}
              fontSize={'xs'}
              color={'rgba(0,0,0,0.4)'}
            >
              {item?.service?.providers[0]?.price?.maximumPrice} JD
            </Text>
            <Text ml={1} fontSize={'xs'} color={'rgba(0,0,0,0.4)'}>
              {' '}
              |
            </Text>
            <Button
              // onPress={() => {
              //   setServices(filter(item, index));
              // }}
              size={'sm'}
              variant={'ghost'}
            >
              -
            </Button>
            <View
              w={'6%'}
              ml={'2%'}
              numberOfLines={1}
              bg={'#91AEC4'}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={'full'}
            >
              <Text fontSize={'xs'} color={'white'}>
                1
              </Text>
            </View>

            <Button
              // onPress={() => {
              //   setServices(addService(item, index));
              // }}
              size={'sm'}
              variant={'ghost'}
            >
              +
            </Button>
          </HStack>
        ))}
        <Button variant={'ghost'} mb={'3%'} mt={'2%'}>
          Add Service +
        </Button>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
const fun = () => {
  let num = [1, 2, 2, 1];
  for (let i = 0; i < num.length / 2; i++) {
    if (num[num.length - (i + 1)] !== num[i]) {
      return false;
    }
  }
  return true;
};
console.log(fun());

export default UpdateService;
