import { Box, Button, HStack, Text, View, ScrollView } from 'native-base';
import Transaction from './TransactionsData';
import transactions from './dummy-data';
const RecentTransactions = ({ navigation }) => {
  const handleNavigate = () => {
    console.log('hello');
    navigation.navigate('transactions');
  };
  //slice the array to get the last 5 transactions
  const recentTransactions = transactions.slice(0, 5);
  const renderTransactions = () => {
    return (
      <ScrollView>
        <View>
          {transactions.length > 0 ? (
            recentTransactions.map((transaction, index) => {
              return (
                <Transaction
                  key={index}
                  transaction={transaction}
                  navigation={navigation}
                />
              );
            })
          ) : (
            <Box
              h={'100%'}
              bg="#fff"
              borderRadius={8}
              marginLeft={25}
              padding={8}
              marginRight={25}
              width={200}
            >
              <Text>No Transactions</Text>
            </Box>
          )}
        </View>
      </ScrollView>
    );
  };
  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" padding={2}>
        <Text>Recent Transactions</Text>
        <Button onPress={handleNavigate} variant="link">
          View All
        </Button>
      </HStack>
      {renderTransactions()}
    </>
  );
};

export default RecentTransactions;
