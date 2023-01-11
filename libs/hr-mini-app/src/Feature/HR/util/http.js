import axios from 'axios';

const { requestBuilder } = require('../../../requestBuilder');
// export async function httpRequest(endPoint, body) {
//   const data = await axios(
//     requestBuilder('hr', `${endPoint}`, 'post', `${body}`)
//   );
//   return data.data;
// }
////////////////////////////////////////////
///refactor
const getSettingsDataService = async () => {
  // return await axios.post(
  //   'http://192.168.84.128:31602/hr/settings/getSettingsData'
  // );
  //
  try {
    return await requestBuilder('/hr/settings/getSettingsData');
  } catch (e) {
    console.log(e);
  }
};
const getEmployeesInforamtionService = async (hrDTO) => {
  // return await axios.post(
  //   'http://192.168.84.128:31602/hr/profile/getEmployees',
  //   hrDTO
  // );
  //
  try {
    return await requestBuilder('/hr/profile/getEmployees', hrDTO);
  } catch (e) {
    console.log(e);
  }
};
const getEmployeeFullDataService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/profile/getEmployeeData',
    //   hrDTO
    // );
    return await requestBuilder('/hr/profile/getEmployeeData', hrDTO);
  } catch (error) {
    console.log(error);
  }
};
// ///leave table
const createNewLeaveService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/leaves/createLeave',
    //   hrDTO
    // );
    return await requestBuilder('/hr/leaves/createLeave', hrDTO);
  } catch (error) {
    console.log(error);
  }
};
const getLeaveRequestService = async (hrDTO) => {
  try {
    // let response = await axios.post(
    //   'http://192.168.84.128:31602/hr/leaves/getLeaves',
    //   hrDTO
    // );
    // return response;
    let res = await requestBuilder('/hr/leaves/getLeaves', hrDTO);
    return res.data;
  } catch (error) {
    return error;
  }
};
const updateLeaveRequestService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/leaves/updateLeave',
    //   hrDTO
    // );
    return await requestBuilder('/hr/leaves/updateLeave', hrDTO);
  } catch (error) {
    console.log(error);
  }
};
// //time attendance table
const getTimeAttendanceDataService = async (hrDTO) => {
  // return await axios.post(
  //   'http://192.168.84.128:31602/hr/timeAttendance/getTimeAttendanceData',
  //   hrDTO
  // );
  //
  try {
    return await requestBuilder(
      '/hr/timeAttendance/getTimeAttendanceData',
      hrDTO
    );
    // return await axios.post(
    // )
  } catch (error) {
    console.log(error);
  }
};

const getTodayTimeAttendanceForEmployeeService = async (hrDTO) => {
  try {
    const res = await requestBuilder(
      '/hr/timeAttendance/getTimeAttendance',
      hrDTO
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
const createNewMissingService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/timeAttendance/missing',
    //   hrDTO
    // );
    return await requestBuilder('/hr/timeAttendance/missing', hrDTO);
  } catch (error) {
    console.log(error);
  }
};
const createNewMissingInService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/timeAttendance/missingIn',
    //   hrDTO
    // );
    return await requestBuilder('/hr/timeAttendance/missingIn', hrDTO);
  } catch (error) {
    console.log(error);
  }
};
const acceptMissingInService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/timeAttendance/acceptMissingIn',
    //   hrDTO
    // );
    return await requestBuilder('/hr/timeAttendance/acceptMissingIn', hrDTO);
  } catch (error) {
    console.log(error);
  }
};
const acceptMissingOutService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/timeAttendance/acceptMissingOut',
    //   hrDTO
    // );
    return await requestBuilder('/hr/timeAttendance/acceptMissingOut', hrDTO);
  } catch (error) {
    console.log(error);
  }
};
const rejectMissingInService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/timeAttendance/rejectMissingIn',
    //   hrDTO
    // );
    return await requestBuilder('/hr/timeAttendance/rejectMissingIn', hrDTO);
  } catch (error) {
    console.log(error);
  }
};
const rejectMissingOutService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/timeAttendance/rejectMissingOut',
    //   hrDTO
    // );
    return await requestBuilder('/hr/timeAttendance/rejectMissingOut', hrDTO);
  } catch (error) {
    console.log(error);
  }
};
const getTimeAttendanceEmployeeService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/timeAttendance/getAllEmployeesWithTimeAttendance',
    //   hrDTO
    // );
    return await requestBuilder(
      '/hr/timeAttendance/getAllEmployeesWithTimeAttendance',
      hrDTO
    );
    // return await axios.post(
    // )
  } catch (error) {
    console.log(error);
  }
};

const totalAttendanceHoursService = async (hrDTO) => {
  try {
    // return await window.$nuxt.$axios({
    //   path: "/hr/timeAttendance/totalAttendanceHours",
    //   data: hrDTO,
    // });
    let res = await requestBuilder(
      '/hr/timeAttendance/totalAttendanceHours',
      hrDTO
    );
    return res.data;
    // return axios.post(
    //   "http://localhost:31602/hr/timeAttendance/totalAttendanceHours",
    //   hrDTO
    // );
  } catch (error) {
    console.log(error)
    throw error;
  }
};
// const createNewEmployeeService = async (hrDTO) => {
//   try {
//     return await axios.post(
//       "http://192.168.84.128:31602/hr/profile/createNewEmployee",
//       hrDTO
//     );
//   } catch (error) {
//     throw error;
//   }
// };
// const createNewContractService = async (hrDTO) => {
//   try {
//     return await axios.post(
//       "http://192.168.84.128:31602/hr/contracts/createContract",
//       hrDTO
//     );
//   } catch (error) {
//     throw error;
//   }
// };
// const addWorkingHoursForEmployeeService = async (hrDTO) => {
//   try {
//     return await axios.post(
//       "http://192.168.84.128:31602/hr/workingHours/addWorkingHours",
//       hrDTO
//     );
//   } catch (error) {
//     throw error;
//   }
// };
// const addNewEstablishment = async (hrDTO) => {
//   try {
//     return await axios.post(
//       "http://192.168.84.128:31602/hr/establishment/addEstablishment",
//       hrDTO
//     );
//   } catch (error) {
//     throw error;
//   }
// };
const checkInService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/timeAttendance/checkIn',
    //   hrDTO
    // );
    return await requestBuilder('/hr/timeAttendance/checkIn', hrDTO);
  } catch (error) {
    console.log(error);
  }
};

const createTimeAttendanceService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/timeAttendance/getAllEmployeesWithTimeAttendance',
    //   hrDTO
    // );
    return await requestBuilder(
      '/hr/timeAttendance/createTimeAttendance',
      hrDTO
    );

    // return await axios.post(
    // )
  } catch (error) {
    console.log(error);
  }
};
const checkOutService = async (hrDTO) => {
  try {
    // return await axios.post(
    //   'http://192.168.84.128:31602/hr/timeAttendance/checkOut',
    //   hrDTO
    // );
    return await requestBuilder('/hr/timeAttendance/checkOut', hrDTO);
  } catch (error) {
    console.log(error);
  }
};

//==================================================================================================
const checkEmployeeStatusCronJob = async (hrDTO) => {
  try {
    // return await window.$nuxt.$axios({
    //   path: "/cron/scheduledJobs/createNewScheduledJob",
    //   data: hrDTO,
    // });
    // return axios.post(
    //   "http://localhost:31602/hr/timeAttendance/checkEmployeeStatus",
    //   hrDTO
    // );
    return await requestBuilder(
      '/cron/scheduledJobs/createNewScheduledJob',
      hrDTO
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const cancelCronJobForEmployee = async (hrDTO) => {
  try {

    return await requestBuilder(
      '/cron/scheduledJobs/deleteScheduledJobsByEntityId',
      hrDTO
    );
    // return axios.post(
    //   "http://localhost:31602/hr/timeAttendance/checkEmployeeStatus",
    //   hrDTO
    // );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getEmployeeByCiamId = async (data) => {
  try {
    const response = await requestBuilder(
      '/hr/profile/getEmployees',
      data
    );
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
//==================================================================================================
module.exports = {
  getSettingsDataService,
  getEmployeesInforamtionService,
  getEmployeeFullDataService,
  getLeaveRequestService,
  // updateLeaveRequestService,
  getTimeAttendanceDataService,
  getTimeAttendanceEmployeeService,
  checkInService,
  checkOutService,
  // createNewEmployeeService,
  // createNewContractService,
  // addWorkingHoursForEmployeeService,
  // addNewEstablishment,
  createNewMissingService,
  createNewMissingInService,
  createNewLeaveService,
  acceptMissingInService,
  acceptMissingOutService,
  rejectMissingInService,
  rejectMissingOutService,
  updateLeaveRequestService,

  //==============
  getTodayTimeAttendanceForEmployeeService,
  createTimeAttendanceService,
  checkEmployeeStatusCronJob,
  cancelCronJobForEmployee,
  getEmployeeByCiamId,
  totalAttendanceHoursService,
};
