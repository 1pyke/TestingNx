const SideBarContent = [
  {
    name: 'Edit Profile information',
    component: 'AppointmentsReceptionistProfile',
    icon: 'account-edit-outline',
  },
  {
    name: 'Security and login',
    component: 'MyActivity',
    icon: 'lock-outline',
  },
  {
    name: 'Notifications',
    component: 'TasksCharts',
    icon: 'bell-outline',
  },
  { name: 'BookMarks', component: 'MyHr', icon: 'bookmark-outline' },
  { name: 'Favorite', component: 'Hr', icon: 'cards-heart-outline' },
  {
    name: 'Payments',
    component: 'SignIn',
    icon: 'credit-card-settings-outline',
  },
  { name: 'Preferences', component: 'SignIn', icon: 'periodic-table' },
];
const sideBarContent2 = [
  {
    name: 'My Activtities',
    component: 'AppointmentsReceptionistProfile',
    icon: 'triangle-wave',
  },
  {
    name: 'Invite friends',
    component: 'AppointmentsReceptionistProfile',
    icon: 'account-supervisor-outline',
  },
];
const sideBarContent3 = [
  {
    name: 'Contact US',
    component: 'AppointmentsReceptionistProfile',
    icon: 'chat-outline',
  },
  {
    name: 'Language',
    component: 'AppointmentsReceptionistProfile',
    icon: 'format-text',
  },
  {
    name: 'Settings',
    component: 'AppointmentsReceptionistProfile',
    icon: 'settings',
  },
];
module.exports = { sideBarContent2, SideBarContent, sideBarContent3 };
