import { Box, Heading, HStack, Text, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const TransactionDetails = ({ navigation }) => {
  const transaction = {
    id: '5f9f1b9b-9b9b-4f9f-9b9b-9b9b9b9b9b9b',
    amount: 1000,
    type: 'debit',
    narration: 'Airtime',
    created_at: '2021-07-01T12:00:00.000Z',
    date: '2021-07-01T12:00:00.000Z',
    status: 'success',
    title: 'Airtime',
  };
  return (
    <HStack space={2} alignItems={'center'} justifyContent={'space-between'}>
      <Box
        width={'100%'}
        height={'100%'}
        backgroundColor={'#fff'}
        borderRadius={10}
        padding={5}
        shadow={2}
        _light={{
          backgroundColor: 'gray.50',
        }}
        _dark={{
          backgroundColor: 'gray.700',
        }}
      >
        <Heading size={'md'} color={'#000'} fontWeight={'bold'} mb={5}>
          Transaction Details
        </Heading>
        <HStack
          space={2}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box
            width={'50%'}
            height={'100%'}
            backgroundColor={'#fff'}
            borderRadius={10}
            padding={5}
            shadow={2}
            _light={{
              backgroundColor: 'gray.50',
            }}
            _dark={{
              backgroundColor: 'gray.700',
            }}
          >
            <Heading size={'md'} color={'#000'} fontWeight={'bold'}>
              Balance Before
            </Heading>
            {/* show availabe balance with value*/}
            <HStack
              space={2}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text color={'gray.400'} fontWeight={'bold'}>
                Available Balance
              </Text>
              <Text color={'green.400'} fontWeight={'bold'}>
                400
              </Text>
            </HStack>
            <HStack
              space={2}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text fontWeight={'bold'} color={'gray.400'}>
                Current Balance
              </Text>
              <Text color={'green.400'} fontWeight={'bold'}>
                400
              </Text>
            </HStack>
          </Box>
          <Box
            width={'50%'}
            height={'100%'}
            backgroundColor={'#fff'}
            borderRadius={10}
            padding={5}
            shadow={2}
            _light={{
              backgroundColor: 'gray.50',
            }}
            _dark={{
              backgroundColor: 'gray.700',
            }}
          >
            <Heading size={'md'} color={'#000'} fontWeight={'bold'}>
              Balance After
            </Heading>
            <Text color={'#000'} fontWeight={'bold'}>
              {transaction.amount}
            </Text>
          </Box>
        </HStack>
        <HStack
          space={2}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          {/*
      - Show transaction details:
      - Ref No . and the value will be as a link to download the receipt
      - Transaction Date
      - Value Date
      - Category
      - Payment Method
      */}
        </HStack>
      </Box>
    </HStack>
  );
};
export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    marginTop: 15,
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
