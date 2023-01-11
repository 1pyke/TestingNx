import {
  Avatar,
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Transaction = ({ transaction, showAll, navigation }) => {
  const handleNavigate = () => {
    navigation.navigate('transactions-details', {
      transaction,
    });
  };
  return (
    <Pressable
      onPress={handleNavigate}
      _android={{
        _pressed: {
          bg: 'muted.100',
        },
      }}
      cursor="pointer"
    >
      <Box
        bg="white"
        shadow={1}
        rounded="lg"
        p={2}
        my={1}
        mx={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        h={16}
      >
        <HStack space={2} alignItems="center">
          <Avatar
            size="sm"
            source={{
              uri: transaction.avatar,
            }}
          />
          <VStack space={1}>
            <Text fontSize="sm" bold>
              {transaction.title}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {transaction.text}
            </Text>
          </VStack>
        </HStack>
        <HStack space={2} alignItems="center">
          <Text
            fontSize="sm"
            bold
            color={
              transaction.iconName === 'cash-minus' ? 'red.500' : 'green.500'
            }
          >
            {transaction.amount}
          </Text>
          <Ionicons name={transaction.iconName} size={24} color={'#000'} />
        </HStack>
      </Box>
    </Pressable>
  );
};

export default Transaction;
