import { requestBuilder } from './requestBuilder';

const handleGetLoockups = async (url, payload) => {
  try {
    const { data } = await requestBuilder(`/lookups/${url}`, payload);
    return data;
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
};
const getAllProviders = async (payload) => {
  try {
    const { data } = await requestBuilder(
      '/providers/profile/getProviders',
      payload
    );
    return data;
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
};

const getAllSirvices = async (payload) => {
  try {
    console.log(payload);
    const { data } = await requestBuilder('/services/getServices', payload);
    return data;
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
};

module.exports = {
  handleGetLoockups,
  getAllProviders,
  getAllSirvices,
};
