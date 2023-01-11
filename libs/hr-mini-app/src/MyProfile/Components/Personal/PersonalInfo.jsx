import { Box, Divider, HStack, Text, VStack } from 'native-base';
import FamilyInfo from './FamilyInfo';
import EmergencyContactInfo from './EmergencyContactInfo';

const PersonalInfo = ({ personalInfo, onEdit }) => {
  return (
    <Box>
      {
        personalInfo.map((employee, index) => (
        <VStack space={3} key={index}>
          <HStack
            space={20}
            p={4}
            style={{
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                marginTop: '1%',
              }}
            >
              Email
            </Text>
            <Text style={{ fontSize: 15, marginTop: '1%' }}>
              {employee?.email || 'No Email'}
            </Text>
          </HStack>
          <HStack
            space={20}
            p={4}
            style={{
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, marginTop: '1%' }}>Phone</Text>
            <Text style={{ fontSize: 15, marginTop: '1%' }}>
              {`${employee?.primary_phone?.country_code}-${employee?.primary_phone?.number}` ||
                'No primary_phone'}
            </Text>
          </HStack>
          <HStack
            space={20}
            p={4}
            style={{
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, marginTop: '1%' }}>Birthday</Text>
            <Text style={{ fontSize: 15, marginTop: '1%' }}>
              {employee?.dob || ''}
            </Text>
          </HStack>
          <HStack
            space={20}
            p={4}
            style={{
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, marginTop: '1%' }}>Gender</Text>
            <Text style={{ fontSize: 15, marginTop: '1%' }}>
              {employee?.gender.name?.en || employee?.gender.name?.ar || ''}
            </Text>
          </HStack>
          <HStack
            space={20}
            p={4}
            style={{
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, marginTop: '1%' }}>Address</Text>
            <Text style={{ fontSize: 15, marginTop: '1%' }}>
              {employee?.address?.name?.en ||
                employee?.address?.name?.ar ||
                'N/A'}
            </Text>
          </HStack>
          <FamilyInfo familyInfo={employee?.relatedFamily || []}  />
          <EmergencyContactInfo
            emergencyContactInfo={employee?.emergencyContacts || []}
          />
        </VStack>
      ))}
    </Box>
  );
};

export default PersonalInfo;
