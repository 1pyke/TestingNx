import { Box, Center, Heading, HStack, View } from 'native-base';
import Chart from '../Components/Chart/Chart';
const CashDataScreen = ({ transaction }) => {
  {
    /*
      - Transaction Details Screen have the following details
      -  inventory cost
      - facility cost
      - laser avenue profit
      - provider cut
      - commission
      - referral bonus
      - total
     */
  }
  const cashDetails = [
    {
      title: 'Inventory cost',
      value: '500.00 JOD',
    },
    {
      title: 'Facility cost',
      value: '20.00 JOD',
    },
    {
      title: 'Laser avenue profit',
      value: '100.00 JOD',
    },
    {
      title: 'Provider cut',
      value: '60.00 JOD',
    },
    {
      title: 'Commission',
      value: '10.00 JOD',
    },
    {
      title: 'Referral bonus',
      value: '00.00',
    },
  ];

  const renderCashDetails = ({ item, index }) => {
    return (
      <HStack key={index}>
        <Box
          bg="#F1F1FB"
          w={'100%'}
          borderRadius={8}
          marginLeft={25}
          padding={1}
          marginRight={25}
          width={350}
          shadow={2}
          mb={5}
        >
          <HStack justifyContent="space-between" padding={2}>
            <View space={2}>
              <Heading fontSize={14} color={'#08132F'} fontWeight="bold">
                {item.title}
              </Heading>
            </View>
            <View space={2} alignItems={'flex-end'}>
              <Heading fontSize={20} color="green.500" fontWeight="bold">
                {item.value}
              </Heading>
            </View>
          </HStack>
        </Box>
      </HStack>
    );
  };
  return (
    <Center bg={'#fff'} p={4}>
      <Heading
        fontSize={20}
        color={'#000'}
        fontWeight="bold"
        alignSelf={'flex-start'}
        mb={4}
      >
        Service Category
      </Heading>
      {cashDetails.map((item, index) => {
        return renderCashDetails({ item, index });
      })}
      <Chart />
    </Center>
  );
};
export default CashDataScreen;
