import axios from 'axios';
import { requestBuilder } from './requestBuilder';
import {
  generateNewVoucher,
  getAllTemplates,
  getVouchersIssues,
  setTemplateLoadingState,
  setOffset,
  setMaxOffset,
  updateGeneratedVoucher,
} from '../Features/Feature1/referralSlice-store';
const url = 'http://192.168.86.35:32103';

const getAllTemplatesData = async (body, dispatch, offset, search) => {
  try {
    dispatch(setTemplateLoadingState(true));
    const { data } = await requestBuilder(
      `/voucher/voucherTemplate/getVoucherTemplate`,
      body
    );
    // console.log(body, 'body');
    // const { data } = await axios.post(
    //   `${url}/voucher/voucherTemplate/getVoucherTemplate`,
    //   body
    // );
    console.log(
      body,
      '---------------------body-------------------------------'
    );
    // console.log(data, 'response');
    dispatch(getAllTemplates({ data: data.rows, search }));
    dispatch(setOffset(offset + 1));
    dispatch(setMaxOffset(data.pages));
    dispatch(setTemplateLoadingState(false));
  } catch (error) {
    dispatch(setTemplateLoadingState(false));
    console.error(error);
    throw error;
  }
};

const generateVoucher = async (
  body,
  remaning,
  setRemaining,
  setLoading,
  setStatusRecived,
  dispatch
) => {
  try {
    const { data } = await requestBuilder(
      `/voucher/issuedVoucher/createIssuedVoucher`,
      body
    );
    // const { data } = await axios.post(
    //   `${url}/voucher/issuedVoucher/createIssuedVoucher`,
    //   body
    // );
    dispatch(generateNewVoucher(data));
    setLoading(false);
    setRemaining(remaning - 1);
    setStatusRecived('success');
    return data;
  } catch (error) {
    setLoading(false);
    setStatusRecived('error');
    console.log(error);
    throw error;
  }
};

const updateIssuedVoucher = async (body, dispatch) => {
  try {
    const { data } = await requestBuilder(
      `/voucher/issuedVoucher/updateIssuedVoucher`,
      body
    );
    // const { data } = await axios.post(
    //   `${url}/voucher/issuedVoucher/updateIssuedVoucher`,
    //   body
    // );
    // console.log(body);
    dispatch(
      updateGeneratedVoucher({
        data: data,
        seq: body.seq,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const vouchersIssues = async (body, dispatch) => {
  try {
    const { data } = await requestBuilder(
      `/voucher/issuedVoucher/getIssuedVouchers`,
      body
    );
    // const { data } = await axios.post(
    //   `${url}/voucher/issuedVoucher/getIssuedVouchers`,
    //   body
    // );

    return dispatch(getVouchersIssues(data.rows));
  } catch (error) {
    console.error(error);
  }
};

const getSettings = async (body) => {
  try {
    const { data } = await requestBuilder(`/voucher/setting/getSettings`, body);

    // const { data } = await axios.post(
    //   `${url}/voucher/setting/getSettings`,
    //   body
    // );
    return data.rows;
  } catch (error) {
    console.error(error);
  }
};

const validateGenerateVoucher = async (body, setLoading) => {
  try {
    const { data } = await requestBuilder(
      `/voucher/issuedVoucher/issuedVoucherValidation`,
      body
    );
    // const { data } = await axios.post(
    //   `${url}/voucher/issuedVoucher/issuedVoucherValidation`,
    //   body
    // );

    return data;
  } catch (error) {
    setLoading(false);
    console.error(error);
    throw error;
  }
};

const getAllEstablishment = async (body) => {
  try {
    const { data } = await requestBuilder(
      `/establishment/getEstablishments`,
      body
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const shortUrl = async (body) => {
  try {
    const { data } = await requestBuilder(
      `/voucher/issuedVoucher/shortLink`,
      body
    );
    // const { data } = await axios.post(
    //   `${url}/voucher/issuedVoucher/shortLink`,
    //   body
    // );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
};

const resendSms = async (body) => {
  try {
    console.log(body);
    const { data } = await requestBuilder(
      '/voucher/issuedVoucher/resendSms',
      body
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllTemplatesData,
  vouchersIssues,
  generateVoucher,
  getSettings,
  validateGenerateVoucher,
  getAllEstablishment,
  updateIssuedVoucher,
  shortUrl,
  resendSms,
};
