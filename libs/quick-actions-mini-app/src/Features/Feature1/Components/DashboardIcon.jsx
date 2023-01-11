import React, { useState } from 'react';
import { Text, Pressable, TouchableOpacity } from 'react-native';
import { VStack, Icon, Image, Spinner } from 'native-base';
import { StyleSheet } from 'react-native';
import { colors } from '../../../Constants/index';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import FormModal from './FormModal';

const { requestBuilder } = require('../../../requestBuilder');

export default function DashboardIcon({ template }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [sentErrorfully, setSentErrorfully] = useState(false);

  // ----------------------------------------------------------------------------------------

  function onCloseFormModal() {
    setShowFormModal(false);
  }

  // ----------------------------------------------------------------------------------------

  async function apiService(id, subject = null, description = null, date = '') {
    try {
      // console.log(date, '----------------------------------------');
      setIsLoading(true);

      if (id == 1) {
        const { data } = await requestBuilder(
          '/incidents/template/createIncidentbyEvent',
          {
            templateID: template.template.id,
            subject: subject ? { en: subject, ar: '' } : null,
            description: description
              ? {
                  en: description,
                  ar: '',
                }
              : null,
            dueDate: date,
          }
        );
        if (data) {
          setIsLoading(false);
          setSentSuccessfully(true);
          setTimeout(() => {
            setSentSuccessfully(false);
          }, 2000);

          onCloseFormModal();
        } else {
          setIsLoading(false);
          setSentErrorfully(true);
          setTimeout(() => {
            setSentErrorfully(false);
          }, 2000);
          onCloseFormModal();
        }
      }

      if (id == 2) {
        const { data } = await requestBuilder(
          '/tasks/template/createTaskByTemplateId',
          {
            templateId: template.template.id,
            subject: subject ? { en: subject, ar: '' } : null,
            description: description
              ? {
                  en: description,
                  ar: '',
                }
              : null,
            dueDate: date,
          }
        );
        if (data) {
          setIsLoading(false);
          setSentSuccessfully(true);
          setTimeout(() => {
            setSentSuccessfully(false);
          }, 2000);
          onCloseFormModal();
        } else {
          setIsLoading(false);
          setSentErrorfully(true);
          setTimeout(() => {
            setSentErrorfully(false);
          }, 2000);
          onCloseFormModal();
        }
      }

      if (id == 3) {
        const data = await requestBuilder(
          '/notifications/template/createNotificationFromTemplate',
          {
            templateId: template.template.id,
            subject: subject ? { en: subject, ar: '' } : null,
            description: description
              ? {
                  en: description,
                  ar: '',
                }
              : null,
            date: date,
          }
        );
        if (data) {
          setIsLoading(false);
          setSentSuccessfully(true);
          setTimeout(() => {
            setSentSuccessfully(false);
          }, 2000);
          onCloseFormModal();
        } else {
          setIsLoading(false);
          setSentErrorfully(true);
          setTimeout(() => {
            setSentErrorfully(false);
          }, 2000);
          onCloseFormModal();
        }
      }

      onCloseFormModal();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setSentErrorfully(true);
      setTimeout(() => {
        setSentErrorfully(false);
      }, 2000);
      onCloseFormModal();
    }
  }

  // ----------------------------------------------------------------------------------------

  const iconPressed = () => {
    if (template.subject || template.description || template.date) {
      setShowFormModal(true);
    } else {
      apiService(template.quickActionType.id);
    }
  };

  // ----------------------------------------------------------------------------------------

  return (
    (template.mobileIcon || template.image) && (
      <>
        <FormModal
          showModal={showFormModal}
          onCloseModal={() => onCloseFormModal()}
          template={template}
          apiService={apiService}
        />
        <VStack
          key={template.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => iconPressed()}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
              marginVertical: 5,
              width: 68,
              height: 68,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: !template.favorite ? colors.color4 : '#FFD700',
              borderRadius: 100,
            }}
          >
            {template.image &&
              template.mobileIcon &&
              !isLoading &&
              !sentSuccessfully &&
              !sentErrorfully && (
                <Image
                  borderRadius={100}
                  size="sm"
                  resizeMode="cover"
                  source={{
                    uri: template.image,
                  }}
                  alt={'Action'}
                />
              )}
            {template.mobileIcon &&
              !template.image &&
              !isLoading &&
              !sentSuccessfully &&
              !sentErrorfully && (
                <Icon
                  alignSelf="center"
                  as={MaterialCommunityIcons}
                  name={template.mobileIcon}
                  size={9}
                  color={colors.color1}
                />
              )}
            {template.image &&
              !template.mobileIcon &&
              !isLoading &&
              !sentSuccessfully &&
              !sentErrorfully && (
                <Image
                  borderRadius={100}
                  size="sm"
                  resizeMode="cover"
                  source={{
                    uri: template.image,
                  }}
                  alt={'Action'}
                />
              )}
            {isLoading && <Spinner color={colors.color2} />}
            {sentSuccessfully && !isLoading && (
              <Icon
                alignSelf="center"
                as={MaterialCommunityIcons}
                name="checkbox-marked-circle"
                size={10}
                color={colors.INPUT_SUCCESS}
              />
            )}
            {sentErrorfully && !isLoading && (
              <Icon
                alignSelf="center"
                as={MaterialIcons}
                name="error"
                size={10}
                color="#FF2400"
              />
            )}
          </TouchableOpacity>
          <Text style={styles.text}>{template.label.en} </Text>
        </VStack>
      </>
    )
  );
}
const styles = StyleSheet.create({
  text: {
    color: colors.color1,
    fontSize: 10,
    fontWeight: '700',
  },
});
