import { Modal, Box } from 'native-base';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { colors } from '../Constants/index';

const SharedModal = ({
  children,
  isOpen,
  onClose,
  isNotCreate,
  ModalHeight,
  bg,
}) => {
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(onClose)}
      animationPreset="slide"
      _backdrop={{
        bg: 'coolGray.800',
      }}
      w="100%"
      h="100%"
      {...style[
        {
          bottom: {
            marginBottom: 0,
            marginTop: 'auto',
          },
        }
      ]}
      justifyContent="flex-end"
    >
      <Box
        position="absolute"
        w="100%"
        h={ModalHeight}
        pb={10}
        pt={isNotCreate ? 20 : 0}
        justifyContent={isNotCreate ? 'space-evenly' : 'flex-start'}
        alignItems={isNotCreate ? 'flex-start' : 'center'}
        _light={{
          bg: bg || colors.whitesmoke,
          color: colors.color2,
        }}
        borderTopRadius={30}
      >
        <Modal.CloseButton />
        {children}
      </Box>
    </Modal>
  );
};

export default SharedModal;
const style = StyleSheet.create({});
