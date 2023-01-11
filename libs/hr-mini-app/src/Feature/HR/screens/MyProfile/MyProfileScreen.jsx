import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { useEffect, useState } from 'react';
import { getEmployeeFullDataService } from '../../util/http';
import ProfileTabs from '../../../../MyProfile/Components/ProfileTabs/ProfileTabs';
import { useSelector } from 'react-redux';

const MyProfileScreen = () => {
  const AuthStore = useSelector((state) => state.AuthStore);
  const hrStore = useSelector((state) => state.hrStore);

  const [facilityId, setFacilityId] = useState(
    'FAC-FCF-JOR-1bf94704-d0c4-4766-ad03-0c2f26fecd46'
  );
  const [employeeId, setEmployeeId] = useState(
    'HRS-HRP-JOR-1730c46d-3b82-4010-b89f-a18a4e4dfd0b'
  );

  const [profileInfo, setAllProfileInfo] = useState([]);
  const [educationInfo, setEducationInfo] = useState([]);
  const [experienceInfo, setExperienceInfo] = useState([]);

  const getEmployee = async () => {
    try {
      const response = await getEmployeeFullDataService({
        employee_id: [hrStore.employeeId],
        // "employee_id":["HRS-HRP-JOR-a79df774-0955-4891-bf2f-3a194de60cc7"]
      });
      console.log('response', response.data.data);
      setAllProfileInfo(response.data.data.response);
      setEducationInfo(response.data.data.response?.education);
      setExperienceInfo(response.data.data.response?.experiences);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    try {
      getEmployee().then((r) => console.log());
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <ScrollView>
      <Box style={{ backgroundColor: '#FFF' }}>
        <Center>
          {/*  avatar to show user image in center of the page*/}

          {profileInfo.map((employee, index) => (
            <>
              <HStack space={3} alignItems="center">
                <Avatar
                  size="xl"
                  source={{
                    uri: employee?.image ?? 'https://bit.ly/dan-abramov',
                  }}
                />
              </HStack>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: '4%',
                  marginLeft: '4%',
                }}
              >
                {employee?.name?.en || employee.name?.ar || 'No Name'}
              </Text>
              <Heading
                style={{
                  fontSize: 13,
                  marginTop: '3%',
                }}
              >
                Date of Join : {employee?.contract?.joining_date || 'No Date'}
              </Heading>
            </>
          ))}
        </Center>
        <ProfileTabs personalInfo={profileInfo} />
      </Box>
    </ScrollView>
  );
};

export default MyProfileScreen;
