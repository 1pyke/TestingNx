import React, { useState } from 'react';
import { Button, Actionsheet, useDisclose } from 'native-base';
import { Linking, Platform, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import EditNumberModal from '../edit/EditNumberModal';
import { shortUrl, resendSms } from '../../../../services/service';

const MenuActionSheet = ({
  isOpen,
  onClose,
  voucher,
  modalVisible,
  setModalVisible,
}) => {
  const authStore = useSelector((state) => state.AuthStore);

  const contentWidth = useWindowDimensions().width;
  const handleEditNumber = () => {
    try {
      // console.log("edit", voucher.creator);
      // console.log(authStore.user.name, authStore.user.id);
      setModalVisible(true);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendSms = async () => {
    try {
      const shortLinkUrl = await shortUrl({
        voucherId: voucher.id,
        templateId: voucher.vmcMtVoucherTemplateId,
      });

      const sendSms = await resendSms({
        ...voucher,
        smsUrl: shortLinkUrl.shortLink,
      });
      console.log(sendSms);
    } catch (error) {
      console.error(error);
    }
  };

  const sendWhatsApp = async () => {
    const shortLinkUrl = await shortUrl({
      voucherId: voucher.id,
      templateId: voucher.vmcMtVoucherTemplateId,
    });

    let msg = `Hello ${voucher.consumer.name.en} your QRcode  ${voucher.qrCode} is valid until ${voucher.endDate} , link is : ${shortLinkUrl.shortLink} `;
    let phoneWithCountryCode =
      voucher.consumer.number.countryCode + voucher.consumer.number.number;

    let mobile =
      Platform.OS === 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
        Linking.openURL(url)
          .then((data) => {
            console.log('WhatsApp Opened');
          })
          .catch(() => {
            alert('Make sure WhatsApp installed on your device');
          });
      } else {
        alert('Please insert message to send');
      }
    } else {
      alert('Please insert mobile no');
    }
  };

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content contentWidth={contentWidth}>
          {voucher.status.id === '1' &&
            voucher.creator.id === authStore.user.id && (
              <Actionsheet.Item onPress={handleEditNumber}>
                Edit
              </Actionsheet.Item>
            )}
          <Actionsheet.Item onPress={handleSendSms}>
            Share via SMS
          </Actionsheet.Item>
          <Actionsheet.Item onPress={sendWhatsApp}>
            Share via Whatsup
          </Actionsheet.Item>
          {/* <Actionsheet.Item color="red.500">Delete</Actionsheet.Item> */}
        </Actionsheet.Content>
      </Actionsheet>
      {modalVisible && (
        <EditNumberModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          voucher={voucher}
        />
      )}
    </>
  );
};

export default MenuActionSheet;
