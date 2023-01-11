import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Heading } from 'native-base';
import GeneratedVoucher from './GeneratedVoucher';
import { vouchersIssues } from '../../../../services/service';

const HistoryVouchers = ({ id }) => {
  const dispatch = useDispatch();
  const vouchers = useSelector((state) => state.referral.generatedVouchers);
  useEffect(() => {
    try {
      let response = async () => {
        await vouchersIssues(
          {
            vmcMtVoucherTemplateId: id,
          },
          dispatch
        );
      };
      response();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Box mt="8">
      {vouchers.length ? (
        <Center>
          <Heading mx="5" color="#707070">
            {' '}
            History{' '}
          </Heading>
        </Center>
      ) : null}
      {vouchers.map((voucher) => (
        <Center
          rounded="md"
          mx="5"
          justifyContent="center"
          key={voucher.id}
          flex={1}
        >
          <GeneratedVoucher voucher={voucher} />
        </Center>
      ))}
    </Box>
  );
};

export default HistoryVouchers;

const styles = StyleSheet.create({});
