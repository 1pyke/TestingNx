import { StyleSheet } from 'react-native';
import React from 'react';
import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
} from 'native-base';

const Voucher = ({ template, navigation }) => {
  const handleNavigation = (nav, page, template) => {
    nav.navigate(page, template);
  };
  return (
    <Pressable
      key={template.id}
      cursor="pointer"
      flex={1}
      onPress={() => handleNavigation(navigation, 'VoucherDetails', template)}
    >
      <Box
        width="100%"
        height="100"
        justifyContent="space-between"
        border="1"
        borderColor={'coolGray.300'}
        rounded="lg"
        borderRadius="md"
        style={styles.templateBox}
        mt={'3'}
        borderWidth="1"
      >
        <HStack height="100%" justifyContent="space-between">
          <Stack width="65%" direction="column">
            <Text
              isTruncated
              w="80%"
              bold
              ml={'3'}
              mt={'3'}
              fontSize="lg"
              color={'#194569'}
            >
              {template.subject.en}
            </Text>

            <Center height={'80%'} mx={1}>
              <Text isTruncated w="90%" fontSize="sm" color={'#194569'}>
                {template.description.en}
              </Text>
            </Center>
          </Stack>

          {template.images.count ? (
            <Image
              resizeMode="cover"
              source={{ uri: template.images.rows[0].image }}
              alt="Alternate Text"
              size="lg"
            />
          ) : (
            <Image
              resizeMode="cover"
              source={require('../../../../../../apps/clinc-container/assets/referral/voucherImage.png')}
              alt="Alternate Text"
              size="lg"
            />
          )}
        </HStack>
      </Box>
    </Pressable>
  );
};

export default Voucher;

const styles = StyleSheet.create({
  templateBox: {
    flexGrow: 0,
    flexShrink: 1,
  },
});
