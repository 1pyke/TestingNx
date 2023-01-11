import React from 'react';
import {
  View,
  ScrollView,
  BackHandler,
  Alert,
  RefreshControl,
} from 'react-native';
import Tasks from './components/Tasks';
import { useFocusEffect } from '@react-navigation/native';
import DashboradCards from './components/DashboradCards';
import DashboardHeader from './components/DashboardHeader';
import { DashboardIcons } from '@mobile-nx-apps/quick-actions-mini-app';

function Dashboard({ navigation }) {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    wait(1).then(() => setRefreshing(false));
  };
  useFocusEffect(
    React.useCallback(() => {
      // dispatch(dueDateHandler());
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go Exist the App?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );
  return (
    <View style={{ backgroundColor: '#FFFAFA' }}>
      <DashboardHeader />
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={'#5F84A2'}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {/* <View style={styles.announcContainer}>
              <Animated.View
                style={[
                  styles.announcSweep,
                  { transform: [{ translateX: translation }] },
                ]}
              >
                {announcemnt.length > 0 &&
                  announcemnt.map((announc) => (
                    <Text style={styles.announcTxt}>
                      {announc.announcemnt}
                      {'   '}
                      <Icon
                        onPress={() => deleteAnnounc(announc)}
                        name="close"
                        style={{
                          fontSize: 15,
                        }}
                      />
                    </Text>
                  ))}
              </Animated.View>
            </View> */}
        <View>
          <Tasks navigation={navigation} />
          <DashboardIcons />
          {/* <DashboardQuickActions /> */}
          {/* <NotificationCarousel navigation={navigation} /> */}
          {/* {dashboardStore.userToken.profileType?.toLowerCase() === 'receptionist' && (
            <AppointmentManager navigation={navigation} />
          )} */}
          {/* {dashboardStore.userToken.profileType?.toLowerCase() ===
            'provider' && <Appointment navigation={navigation} />} */}
          {/* {dashboardStore.userToken.profileType?.toLowerCase() ===
            'manager' && ( */}
          <DashboradCards navigation={navigation} />
          {/* )} */}
          {/* {dashboardStore.userToken.profileType?.toLowerCase() === 'receptionist' && (
            <Billing navigation={navigation} />
          )} */}
          {/* {dashboardStore.userToken.profileType?.toLowerCase() ===
            'provider' && <BillingProvider navigation={navigation} />} */}
        </View>
      </ScrollView>
      {/* {dashboardStore.modalVisible && <AppontmentModal />} */}
      {/* {dashboardStore.FullViewAppFlag && <FullViewApp />} */}
      {/* <ChangeStatusModal /> */}
    </View>
  );
}

export default Dashboard;
