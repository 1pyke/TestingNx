import React, { useState } from 'react';
import { View, Icon, Image, Box, Text, Spinner } from 'native-base';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../../Constants/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { requestBuilder } = require('../../../requestBuilder');

export default function CustomizeChild({ template, index, getData }) {
  const [loading, setLoading] = useState(false);
  const authStore = useSelector((state) => state.AuthStore);

  //   ----------------------------------------------------------------------------------------

  const addTofavorite = async (template) => {
    try {
      let userObj = { id: authStore.user.id, name: authStore.user.name };

      setLoading(true);
      const addingTofavorite = await requestBuilder(
        'communities/quickAction/addToFavorite',
        {
          user: userObj,
          template: template,
          createdBy: userObj,
        }
      );
      if (addingTofavorite) {
        await getData();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   ----------------------------------------------------------------------------------------

  const removeFromFavorite = async (template) => {
    setLoading(true);
    try {
      const removeingFromFavorite = await requestBuilder(
        'communities/quickAction/removeFromFavorite',
        {
          userId: authStore.user.id,
          templateId: template.id,
        }
      );
      if (removeingFromFavorite) {
        await getData();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   ----------------------------------------------------------------------------------------

  return (
    <View key={index} style={[styles.view]} shadow="2" w="100%" mb="2">
      <Box
        style={{
          paddingHorizontal: '2%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {template.image && template.mobileIcon && (
          <Image
            borderRadius={10}
            size="xs"
            resizeMode="cover"
            source={{
              uri: template.image,
            }}
            alt={'Action'}
          />
        )}
        {template.mobileIcon && !template.image && (
          <Icon
            alignSelf="center"
            as={MaterialCommunityIcons}
            name={template.mobileIcon}
            size={10}
            color={colors.color1}
          />
        )}
        {template.image && !template.mobileIcon && (
          <Image
            borderRadius={10}
            size="xs"
            resizeMode="cover"
            source={{
              uri: template.image,
            }}
            alt={'Action'}
          />
        )}
      </Box>
      <Box w="60%" h="auto" ml="1%" mr="1%">
        <Text fontSize={18} fontWeight={600} color={colors.color1}>
          {template.label.en}
        </Text>
      </Box>

      <Box style={{ width: 35 }}>
        {!template.favorite && !loading && (
          <Icon
            alignSelf="center"
            as={MaterialCommunityIcons}
            onPress={() => {
              addTofavorite(template);
            }}
            name="star-outline"
            size="2xl"
            color={colors.MUTED}
          />
        )}
        {template.favorite && !loading && (
          <Icon
            onPress={() => {
              removeFromFavorite(template);
            }}
            alignSelf="center"
            as={MaterialCommunityIcons}
            name="star"
            size="2xl"
            color={colors.gold}
          />
        )}
        {loading && (
          <View
            bg={'#FFFAFA'}
            h={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Spinner accessibilityLabel="Loading posts" />
          </View>
        )}
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    height: 60,
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    shadowColor: '#171717',
  },
});
