import { View, VStack } from 'native-base';
import WalletBalance from '../Components/WalletBalance';
import CarouselBalance from '../Components/Carousel/Carousel';
import RecentTransactions from '../Components/Transactions/RecentTransactions';
function Landing({ navigation }) {
  return (
    <View height={'100%'} flex={1}>
      <VStack position={'relative'} height={'50%'}>
        <WalletBalance />
      </VStack>
      <CarouselBalance navigation={navigation} />
      <VStack height={'50%'}>
        <RecentTransactions navigation={navigation} />
      </VStack>
    </View>
  );
}
export default Landing;
