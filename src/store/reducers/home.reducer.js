import ACTION_HANDLERS from '../handlers/home.handler';
import { getNewHomeState } from '../helpers';

export const initState = getNewHomeState();

const homeReducer = (state = initState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default homeReducer;
