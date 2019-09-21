import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
    height: 45,
    backgroundColor: '#111'
  },
  text: {
    fontSize: 14,
    color: '#ffffff'
  },
  button: {
    fontSize: 14,
    color: '#ffffff'
  }
};

export default styles;
