import { Center, Heading, Text } from 'native-base';

function WalletBalance() {
  return (
    <Center bg="#B7D0E1" h={'80%'} w={'100%'}>
      <Heading fontSize={35} fontWeight={'bold'} color={'#02416D'}>
        Wallet Balance
      </Heading>
      <Text fontSize={'xl'} fontWeight={'normal'} color={'#02416D'}>
        300.00 JOD
      </Text>
      <Text fontSize={'md'} fontWeight={'normal'} color={'#ffffff'}>
        Current Balance 300.00 JOD
      </Text>
    </Center>
  );
}
export default WalletBalance;
