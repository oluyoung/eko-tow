import ACTION_HANDLERS from '../handlers/authHandler';

const initState = {
  email: '',
  password: '',
  username: 'eman',
  user: {
    id: '5d7d8305127604647eafb25e'
  },
  isLogin: true
};

const authReducer = (state = initState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default authReducer;
