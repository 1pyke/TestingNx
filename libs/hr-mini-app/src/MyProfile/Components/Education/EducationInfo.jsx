import { Box, Heading, HStack, Icon, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CertificationsInfo from './CertificationsInfo';

const EducationInfo = ({ personalInfo }) => {
  const [educationInfo, setEducationInfo] = useState([]);
  useEffect(() => {
    if (personalInfo) {
      setEducationInfo(personalInfo[0].education);
    }else {
      setEducationInfo([]);
    }
  }, [personalInfo]);
  return (
    <Box p={4} backgroundColor={'#fff'} h={'100%'}>
      <Heading size="md" color="#194569" style={{ marginTop: '5%' }}>
        Education
      </Heading>
      {educationInfo ? (
        educationInfo.map((education, index) => (
          <Box
            key={index}
            style={{
              borderBottomWidth: 1,
              marginTop: '5%',
            }}
          >
            {/*
           show bullet points icons
          */}
            <HStack space={3} justifyContent="flex-start" alignItems="center">
              <Icon as={<MaterialCommunityIcons name="circle" />} size="sm" />
              <Text style={{ fontSize: 16, marginTop: '1%' }}>
                {education?.universiity?.en ||
                  education?.universiity?.ar ||
                  'N/A'}
              </Text>
            </HStack>
            <VStack space={1} justifyContent="flex-start" p={1}>
              <Heading
                color={'gray.400'}
                style={{ fontSize: 12, marginLeft: '6%' }}
              >
                {education?.faculty || 'N/A'}
              </Heading>
              <Heading
                color={'gray.400'}
                style={{ fontSize: 12, marginLeft: '6%' }}
              >
                {education?.period?.from || 'N/A'} -{' '}
                {education?.period?.to || 'N/A'}
              </Heading>
            </VStack>
          </Box>
        ))
      ) : (
        <Text style={{ fontSize: 16, marginTop: '1%' }}>No Education Info</Text>
      )}
      <CertificationsInfo
        certifications={personalInfo[0].certifications || []}
      />
    </Box>
  );
};

export default EducationInfo;
