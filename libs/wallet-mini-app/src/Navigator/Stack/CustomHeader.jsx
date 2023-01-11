import { Heading, View } from 'native-base';
import { Platform, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import FilterModal from '../../Features/LandingPage/Components/FilterModal/FilterModal';
function CustomHeader({ navigation }) {
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    // navigation.navigate('home');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };
  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };

  return (
    <>
      <View style={styles.container} bg="muted.50">
        <Ionicons
          onPress={handleNavigate}
          name={Platform.OS === 'ios' ? `ios-arrow-back` : 'md-arrow-back'}
          size={30}
          color="black"
        />
        <Heading color="#194569" fontSize={20} fontWeight="bold">
          My Wallet
        </Heading>
        <Ionicons
          onPress={() => openModal('bottom')}
          name="filter"
          size={30}
          color="black"
        />
      </View>
      <FilterModal
        open={open}
        setOpen={setOpen}
        setPlacment={setPlacement}
        placement={placement}
      />
    </>
  );
}

export { CustomHeader };

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 120,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
