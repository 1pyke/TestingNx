import axios from 'axios';
module.exports = {
  requestBuilder: (path, data = {}, method = 'POST') => {
    try {
      let config = {
        method: method,
        url: 'http://192.81.217.171:50002/AOC/' + path,
        headers: {
          'Content-Type': 'application/json',
          workspace: 'CLK-WEB-88447876-4696-4417-b985-f14a725c0ee1',
        },
        withCredentials: true, //mabye error here
        data: data,
      };
      return axios(config);
    } catch (error) {
      console.log(error, 'login error');
    }
  },
};
//4. Check if the the cube of each number in a given is the same to that number for example: Input = 153, 1^3 + 5^3 + 3^3 = 153 Output = true
