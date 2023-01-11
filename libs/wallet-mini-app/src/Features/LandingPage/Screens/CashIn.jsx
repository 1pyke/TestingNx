import {
  Avatar,
  Box,
  HStack,
  Pressable,
  Text,
  View,
  VStack,
  Heading,
} from 'native-base';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CashIn = ({ route, navigation }) => {
  const data = route.params;
  console.log(data, 'cashhhhhhhhhhhh');
  const handleCashInNavigate = () => {
    navigation.navigate('cash-details');
  };

  return (
    <HStack space={2} alignItems="center">
      <Pressable onPress={handleCashInNavigate}>
        <Box
          h={'40%'}
          bg="#fff"
          w={'100%'}
          borderRadius={8}
          marginLeft={25}
          padding={1}
          marginRight={25}
          width={200}
          shadow={2}
        >
          <HStack justifyContent="space-between" padding={2}>
            <VStack space={2}>
              <Ionicons name="cash-outline" size={30} color="#000" />
              <Heading fontSize={14} color={'#000'} fontWeight="bold">
                890.00
              </Heading>
              <Text>Service Category</Text>
            </VStack>
            <VStack space={2} alignItems={'flex-end'}>
              <Heading fontSize={20} color="green.500" fontWeight="bold">
                26%
              </Heading>
            </VStack>
          </HStack>
        </Box>
      </Pressable>
    </HStack>
  );
};

export default CashIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#02416D',
  },
  description: {
    fontSize: 16,
    color: '#02416D',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#02416D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#02416D',
  },
});
