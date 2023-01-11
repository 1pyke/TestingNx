import { Clipboard, StyleSheet } from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
import React, { useState } from 'react';
import {
  View,
  Box,
  Center,
  Flex,
  Text,
  HStack,
  useDisclose,
  Button,
  useToast,
} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import MenuActionSheet from './MenuActionSheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GeneratedVoucher = ({ voucher }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [modalVisible, setModalVisible] = useState(false);
  const id = 'test-toast';
  const getColor = (id) => {
    try {
      if (id === '1') {
        return 'green';
      } else if (id === '2') {
        return 'orange';
      } else if (id === '5') {
        return 'red';
      } else if (id === '4') {
        return 'blue';
      } else if (id === '3') {
        return 'rgb(140, 115, 115)';
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCopy = () => {
    try {
      Clipboard.setString(voucher.qrCode);
      if (!toast.isActive(id)) {
        toast.show({
          id,
          render: () => {
            return (
              <Box bg="#707070" px="2" py="1" rounded="sm" mb={5}>
                <Text color="white">QR code copied to clipboard</Text>
              </Box>
            );
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Box
        width={'100%'}
        height={'170'}
        my={3}
        rounded={10}
        bg={'#CADEED'}
        style={styles.voucherBox}
      >
        <Button variant="unstyled" onPress={onOpen} style={styles.menu}>
          <FontAwesome
            name="ellipsis-v"
            size={15}
            color="#707070"
            my={3}
            mx={3}
          />
        </Button>
        <Center>
          <HStack>
            <Text style={styles.text}>{voucher.qrCode}</Text>
            <MaterialCommunityIcons
              name="content-copy"
              size={15}
              color="#707070"
              my={3}
              mx={3}
              onPress={onCopy}
              style={styles.icon}
            />
          </HStack>
        </Center>
        {
          <Text style={styles.date}>
            {voucher.issueDate} at {voucher.issueTime}
          </Text>
        }
        <Flex direction="row" justifyContent="space-between" align={'center'}>
          <Center bg="white" borderRightRadius="full" style={styles.left} />
          <Text ellipsizeMode="clip" maxW={'89%'} mt="1" numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - -
          </Text>
          <Center bg="white" borderLeftRadius="full" style={styles.left} />
        </Flex>
        <Center>
          {
            <HStack style={styles.consumer}>
              <Text style={styles.name} mx="3">
                {voucher.consumer.name.en}
              </Text>
              <Text style={styles.number}>
                {voucher.consumer.number.number}
              </Text>
            </HStack>
          }
        </Center>

        <Flex direction="row-reverse">
          <Button
            size="sm"
            variant="ghost"
            mx={3}
            colorScheme={getColor(voucher.status.id)}
          >
            {voucher.status.name.en}
          </Button>
        </Flex>

        {isOpen || modalVisible ? (
          <MenuActionSheet
            isOpen={isOpen}
            onClose={onClose}
            voucher={voucher}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        ) : null}
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  voucherBox: {
    flexGrow: 0,
    flexShrink: 1,
  },
  text: {
    marginTop: 5,
    color: '#194569',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    marginTop: 6,
    fontSize: 16,
    padding: 5,
    marginLeft: 5,
  },
  date: {
    color: '#707070',
    fontWeight: 'bold',
    top: '10%',
    textAlign: 'center',
  },
  left: {
    width: 20,
    height: 40,
    top: '2.5%',
  },
  name: {
    color: '#194569',
    fontWeight: 'bold',
  },
  number: {
    color: '#194569',
    fontWeight: 'bold',
  },
  consumer: {
    marginTop: 2,
  },

  menu: {
    position: 'absolute',
    // alignSelf: 'flex-end',
    paddingTop: 7,
    paddingRight: 14,
    right: 0,
    zIndex: 100,
  },
});
export default GeneratedVoucher;
