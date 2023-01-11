import { Box, Heading, HStack, Icon, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const ExperineceInfo = ({ experiencesInfo }) => {
  const [experienceInfo, setEducationInfo] = useState([]);
  useEffect(() => {
    if (experiencesInfo) {
      setEducationInfo(experiencesInfo);
    } else {
      setEducationInfo([]);
    }
  }, [experiencesInfo]);

  return (
    <Box p={4} backgroundColor={'#fff'} h={'100%'}>
      <Heading size="md" color="#194569" style={{ marginTop: '5%' }}>
        Experiences
      </Heading>
      {experienceInfo.length > 0 ? (
        experienceInfo.map((experience, index) => (
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
                {experience?.title?.name?.en ||
                  experience?.title?.name?.ar ||
                  'N/A'}{' '}
                at {experience?.company?.en || experience?.company?.ar || 'N/A'}
              </Text>
            </HStack>
            <VStack space={1} justifyContent="flex-start" p={1}>
              <Heading
                color={'gray.400'}
                style={{ fontSize: 12, marginLeft: '6%' }}
              >
                {experience?.period?.from || 'N/A'} -{' '}
                {experience?.period?.to || 'N/A'}
              </Heading>
            </VStack>
          </Box>
        ))
      ) : (
        <Text style={{ fontSize: 16, marginTop: '1%' }}>
          No Experiences Info
        </Text>
      )}
    </Box>
  );
};

export default ExperineceInfo;
