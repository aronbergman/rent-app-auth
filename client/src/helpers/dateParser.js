import moment from 'moment';

export const dateParser = (date) => moment(date).locale('ru').format('D MMMM в k:mm');
export const dateParserStartOf = (date) => moment(date).startOf('hour').fromNow();