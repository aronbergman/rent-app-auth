import moment from 'moment';

moment.locale('ru');

export const dateParser = (date) => moment(date).format('LLL');
export const dateParserStartOf = (date) => moment(date).startOf('hour').fromNow();