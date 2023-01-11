import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Box, Text, Center, Skeleton, HStack } from 'native-base';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../../Constants/index';
import CustomizeModal from './CustomizeModal';
import { dispatchDashboardTemplates, storeUserRoles } from '../feature1-store';
import DashboardIcon from './DashboardIcon';

const { requestBuilder } = require('../../../requestBuilder');

export default function DashboardIcons() {
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const authStore = useSelector((state) => state.AuthStore);
  const quickStates = useSelector(
    (state) => state.dashboardActionsTemplatesStore
  );
  const dispatch = useDispatch();

  //   ----------------------------------------------------------------------------------------

  async function bringData() {
    try {
      let userRolesArray = await requestBuilder('ciam/userRoles/getUserRoles', {
        userId: authStore.user.id,
      });
      let userRoles = [];
      for (let i = 0; i < userRolesArray.data.rows.length; i++) {
        const element = userRolesArray.data.rows[i].cimRtRoleId;
        userRoles.push(element);
      }
      console.log('===================roles=================');
      console.log(userRoles);
      console.log('====================================');

      let allQuickActions = await requestBuilder(
        'communities/quickAction/getTemplates',
        {
          userId: authStore.user.id,
          roles: userRoles,
        }
      );

      const allRoles = allQuickActions.data.rows;
      const favoriteRoles = allQuickActions.data.favorites;

      let finalArray = [];

      if (favoriteRoles.length) {
        for (let i = 0; i < allRoles.length; i++) {
          let boolean = false;
          const element = allRoles[i];
          for (let j = 0; j < favoriteRoles.length; j++) {
            const element2 = favoriteRoles[j];
            if (element2.template.id === element.id) {
              finalArray.unshift({ ...element, favorite: true });
              boolean = true;
              break;
            } else {
              continue;
            }
          }
          if (!boolean) {
            finalArray.push({ ...element, favorite: false });
          }
        }
      } else {
        finalArray = allRoles;
      }

      console.log('====================================');
      console.log(finalArray);
      console.log('====================================');
      dispatch(dispatchDashboardTemplates({ templates: finalArray }));

      dispatch(storeUserRoles({ userRoles: userRoles }));
      // console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
      // console.log(quickStates.dashboardTemplates);
    } catch (error) {
      console.log(error);
    }
  }

  //   ----------------------------------------------------------------------------------------

  useEffect(() => {
    bringData();
  }, [authStore]);

  //   ----------------------------------------------------------------------------------------

  function onCloseCustomizeModal() {
    setShowCustomizeModal(false);
  }

  //   ----------------------------------------------------------------------------------------

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        height: 150,
        marginBottom: '4%',
      }}
    >
      {quickStates.dashboardTemplates?.length > 0 && (
        <>
          <CustomizeModal
            showModal={showCustomizeModal}
            onCloseModal={() => onCloseCustomizeModal()}
            templates={quickStates.dashboardTemplates}
          />
          {quickStates.dashboardTemplates.length > 0 && (
            <Button
              _pressed={{ backgroundColor: 'gray' }}
              mr={'5%'}
              size="md"
              style={{
                backgroundColor: colors.color1,
              }}
              onPress={() => {
                setShowCustomizeModal(true);
              }}
            >
              Customize
            </Button>
          )}
          <ScrollView
            style={{
              alignSelf: 'flex-start',
              marginLeft: 10,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            {quickStates.dashboardTemplates?.map((template, index) => {
              return <DashboardIcon key={index} template={template} />;
            })}
          </ScrollView>
        </>
      )}

      {(!quickStates.dashboardTemplates ||
        quickStates.dashboardTemplates.length == 0) && (
        <Center w="100%" h="100%" justifyContent="center">
          <Skeleton
            w="20"
            rounded="5"
            style={{ position: 'absolute', top: 0, right: 0 }}
          />
          <HStack space="2" style={{ position: 'absolute', bottom: 15 }}>
            <Skeleton size="20" rounded="full" />
            <Skeleton size="20" rounded="full" />
            <Skeleton size="20" rounded="full" />
            <Skeleton size="20" rounded="full" />
            <Skeleton size="20" rounded="full" />
          </HStack>
        </Center>
      )}

      {/* <Center w="100%" h="100%" justifyContent="center">
        <HStack space="2" style={{ position: 'absolute', bottom: 15 }}>
          <Skeleton size="20" rounded="full" />
          <Skeleton size="20" rounded="full" />
          <Skeleton size="20" rounded="full" />
          <Skeleton size="20" rounded="full" />
          <Skeleton size="20" rounded="full" />
        </HStack>
      </Center> */}
    </Box>
  );
}
const styles = StyleSheet.create({});
