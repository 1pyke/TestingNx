import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Modal, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../../../Constants/index';
import { dispatchDashboardTemplates } from '../feature1-store';
import CustomizeChild from './CustomizeChild';

const { requestBuilder } = require('../../../requestBuilder');

export default function CustomizeModal(props) {
  const authStore = useSelector((state) => state.AuthStore);
  const quickStates = useSelector(
    (state) => state.dashboardActionsTemplatesStore
  );
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  //   ----------------------------------------------------------------------------------------

  useEffect(() => {
    setModalVisible(props.showModal);
  }, [props.showModal]);

  //   ----------------------------------------------------------------------------------------

  async function bringData() {
    try {
      let allQuickActions = await requestBuilder(
        'communities/quickAction/getTemplates',
        {
          userId: authStore.user.id,
          roles: quickStates.userRoles,
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

      dispatch(dispatchDashboardTemplates({ templates: finalArray }));

      // console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
      // console.log(quickStates.dashboardTemplates);
    } catch (error) {
      console.log(error);
    }
  }

  //   ----------------------------------------------------------------------------------------

  const onClose = () => {
    props.onCloseModal();
  };

  //   ----------------------------------------------------------------------------------------

  return (
    <Modal isOpen={modalVisible} onClose={onClose} size="xl" w="100%">
      <Modal.Content h="800">
        <Modal.CloseButton />
        <Modal.Header color="red">
          <Text style={{ color: colors.color2 }} fontWeight="600" fontSize="md">
            Customize Quick Actions
          </Text>
        </Modal.Header>

        <Modal.Body>
          <ScrollView>
            {props.templates.map((template, index) => {
              return (
                (template.mobileIcon || template.image) && (
                  <CustomizeChild
                    key={index}
                    template={template}
                    index={index}
                    getData={() => {
                      bringData();
                    }}
                  />
                )
              );
            })}
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
const styles = StyleSheet.create({
  // iconimage: {
  //   color: colors.color1,
  //   fontSize: 10,
  //   fontWeight: '700',
  //   marginLeft: 5,
  // },
});
