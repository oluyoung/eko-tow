import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

const styles = {
  container: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    left: (WIDTH-70),
    borderRadius: 50,
    shadowColor: '#000000',
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
};

export default styles;
