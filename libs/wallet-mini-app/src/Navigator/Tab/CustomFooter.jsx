import { Text, Icon, HStack, Center, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const CustomFooter = ({ navigation }) => {
  const [selected, setSelected] = useState(0);
  const handleNavigation = (nav, page, s) => {
    setSelected(s);
    console.log('selected', selected);
    nav.navigate(page);
  };
  return (
    <HStack
      bg="muted.50"
      alignItems="center"
      safeAreaBottom
      shadow={6}
      borderTopWidth={1}
      borderColor="muted.100"
      justifyContent="space-around"
      borderTopLeftRadius={20}
      borderTopRightRadius={20}
      style={styles.shadow}
    >
      <Pressable
        cursor="pointer"
        opacity={selected === 0 ? 1 : 0.5}
        py="3"
        flex={1}
        onPress={() => handleNavigation(navigation, 'home', 0)}
      >
        <Center>
          <Feather
            name="home"
            size={22}
            color={selected === 0 ? '#02416D' : '#000'}
          />
          <Text color="#194569" fontSize={12}>
            Home
          </Text>
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        opacity={selected === 1 ? 1 : 0.5}
        py="2"
        flex={1}
        onPress={() => handleNavigation(navigation, 'transactions', 1)}
      >
        <Center>
          <Icon
            mb="1"
            as={<Entypo name={selected === 1 ? 'ticket' : 'ticket'} />}
            color="#194569"
            size="sm"
          />
          <Text color="#194569" fontSize={12}>
            Transactions
          </Text>
        </Center>
      </Pressable>
      <Pressable
        cursor="pointer"
        opacity={selected === 2 ? 1 : 0.5}
        py="2"
        flex={1}
        onPress={() => handleNavigation(navigation, 'cash-in', 2)}
      >
        <Center>
          <Ionicons
            name="cash-outline"
            size={24}
            color={selected === 2 ? '#02416D' : '#000'}
          />
          <Text color="#194569" fontSize={12}>
            cash in
          </Text>
        </Center>
      </Pressable>
    </HStack>
  );
};

export { CustomFooter };

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 25,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
