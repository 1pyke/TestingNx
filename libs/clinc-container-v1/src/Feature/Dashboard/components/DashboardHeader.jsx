import { View, Text } from 'native-base';
import React from 'react';
import { useSelector } from 'react-redux';

const DashboardHeader = () => {
  const dashboardStore = useSelector((state) => state.AuthStore);
  return (
    <View
      style={{
        alignItems: 'flex-start',
        marginBottom: '2%',
        flexDirection: 'row',
      }}
    >
      {/* <Avatar
      marginLeft={Platform.OS === 'ios' ? '5%' : '5%'}
            size={Platform.OS === 'ios' ? '40px': "40px"}
            source={
              dashboardStore.userToken.photo
                ? { uri: dashboardStore.userToken.photo }
                : {
                    uri: 'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-512.png',
                  }
            }
          /> */}
      <View style={{ flexDirection: 'column', marginLeft: '2%' }}>
        <Text color={'#194569'} style={{ fontSize: 22, marginLeft: '5%' }}>
          Hello,
          <Text color={'#194569'}> {dashboardStore?.user?.name?.en}</Text> 👋
        </Text>
        <Text
          style={{
            fontSize: 10,
            marginLeft: '5%',
            margin: '2%',
            color: 'gray',
          }}
        >
          How Do U Feel Today ?
        </Text>
      </View>
    </View>
  );
};

export default DashboardHeader;
