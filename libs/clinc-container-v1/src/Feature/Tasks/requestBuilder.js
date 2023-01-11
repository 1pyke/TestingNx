const requestBuilder = (serviceName, path, method, data) => {
  try {
    let json = {
      method: 'POST',
      url: 'https://api.development.agentsoncloud.com/external/public',
      headers: {
        'requsted-service': serviceName,
        'requsted-path': path,
        'requsted-method': method,
      },
      data: data,
    };
    // return await this.$axios(json)
    return json;
  } catch (error) {
    return error;
  }
};

module.exports = { requestBuilder };
