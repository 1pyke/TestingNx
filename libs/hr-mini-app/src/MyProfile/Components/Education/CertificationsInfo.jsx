import { Box, Heading, HStack, Icon, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CertificationsInfo = ({ certifications }) => {
  const [certificationsInfo, setCertificationsInfo] = useState([]);
  useEffect(() => {
    if (certifications) {
      setCertificationsInfo(certifications);
    } else {
      setCertificationsInfo([]);
    }
  }, [certifications]);
  return (
    <Box backgroundColor={'#fff'} h={'100%'}>
      <Heading size="md" color="#194569" style={{ marginTop: '5%' }}>
        Certification
      </Heading>
      {certificationsInfo.length > 0 ? (
        certificationsInfo.map((certificate, index) => (
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
                {certificate?.company?.en || certificate?.company?.ar || 'N/A'}
              </Text>
            </HStack>
            <VStack space={1} justifyContent="flex-start" p={1}>
              <Heading
                color={'gray.400'}
                style={{ fontSize: 12, marginLeft: '6%' }}
              >
                {certificate?.period?.from || 'N/A'} -{' '}
                {certificate?.period?.to || 'N/A'}
              </Heading>
            </VStack>
          </Box>
        ))
      ) : (
        <Text style={{ fontSize: 16, marginTop: '1%' }}>
          No Certification Info
        </Text>
      )}
    </Box>
  );
};

export default CertificationsInfo;
