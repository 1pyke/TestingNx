import { Box, ScrollView, Text, View } from 'native-base';
import transactions from '../Components/Transactions/dummy-data';
import Transaction from '../Components/Transactions/TransactionsData';
function Transactions({ navigation }) {
  return (
    <ScrollView>
      <View>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => {
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
}

export default Transactions;
