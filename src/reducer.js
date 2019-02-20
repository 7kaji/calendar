import dayjs from 'dayjs';

export default function reducer(state, action) {
  switch (action.type) {
    case 'CURRENT_MONTH':
      return Object.assign({}, { currentDate: dayjs() });
    case 'PREV_MONTH':
      return Object.assign({}, { currentDate: state.currentDate.subtract(1, 'month') });
    case 'NEXT_MONTH':
      return Object.assign({}, { currentDate: state.currentDate.add(1, 'month') });
    default:
      return state;
  }
}
