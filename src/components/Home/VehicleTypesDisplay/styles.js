import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    width: WIDTH,
    backgroundColor: '#98ffdd',
    padding: 15
  },
  title: {
    paddingBottom: 10,
  },
  wrap: {
    height: 100,
    marginRight: 20,
    width: 100,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 50,
    resizeMode: 'cover',
    backgroundColor: '#fff'
  },
  text: {
    color: '#111',
    fontSize: 12
  }
}

export default styles;
