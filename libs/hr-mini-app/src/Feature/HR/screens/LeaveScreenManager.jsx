import ManagerLeaveRequestsCard from '../components/refactor/cards/ManagerLeaveRequestsCard';
import { Box } from 'native-base';

const LeaveScreenManager = () => {
  return (
    <Box
      bg={'#f0f0f0'}
      flex={1}
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <ManagerLeaveRequestsCard />
    </Box>
  );
};

export default LeaveScreenManager;
