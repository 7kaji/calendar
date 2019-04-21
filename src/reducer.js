import dayjs from 'dayjs';
import { addMonths } from 'date-fns';

export default function reducer(state, action) {
  switch (action.type) {
    case 'CURRENT_MONTH':
      return Object.assign({}, { currentDate: new Date() });
    case 'PREV_MONTH':
      return Object.assign({}, { currentDate: addMonths(state.currentDate, -1) });
    case 'NEXT_MONTH':
      return Object.assign({}, { currentDate: addMonths(state.currentDate, 1) });
    default:
      return state;
  }
}
