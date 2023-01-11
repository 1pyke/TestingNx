import { Button, Center, HStack, Text } from 'native-base';
import { useState } from 'react';
import PersonalInfo from '../Personal/PersonalInfo';
import EducationInfo from '../Education/EducationInfo';
import ExperineceInfo from '../Experinece/ExperineceInfo';
// import colors from 'native-base/lib/typescript/theme/base/colors';

const ProfileTabs = ({ navigation, personalInfo }) => {
  const colors = {
    color1: '#194569',
    color2: '#5F84A2',
    white: '#fff',
  };
  const [activeTab, setActiveTab] = useState('Personal');
  const setTab = (tabName) => {
    setActiveTab(tabName);
  };

  const tabs = [
    {
      id: 1,
      name: 'Personal',
    },
    {
      id: 2,
      name: 'Education',
    },
    {
      id: 3,
      name: 'Experience',
    },
  ];
  return (
    <>
      <Center>
        <HStack
          w="85%"
          justifyContent="center"
          alignItems="center"
          my={2}
          borderColor={colors.color2}
          borderRadius="sm"
          borderWidth={2}
          padding={1}
        >
          {tabs.map((tab, index) => (
            <Button
              key={index}
              bg={activeTab === tab.name ? colors.color2 : 'transparent'}
              onPress={() => setTab(tab.name)}
              w="30%"
              rounded="sm"
              _text={{
                color: activeTab === tab.name ? colors.white : colors.color2,
                fontWeight: 'bold',
              }}
            >
              {tab.name}
            </Button>
          ))}
        </HStack>
      </Center>

      {activeTab === 'Personal' ? (
        <PersonalInfo personalInfo={personalInfo || []} />
      ) : activeTab === 'Education' ? (
        <EducationInfo personalInfo={personalInfo || []} />
      ) : (
        <ExperineceInfo experiencesInfo={personalInfo[0]?.experiences} />
      )}
    </>
  );
};

export default ProfileTabs;
