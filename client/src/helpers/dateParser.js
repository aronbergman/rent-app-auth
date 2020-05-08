import moment from 'moment';

moment.locale('ru');

const dateParser = (date) => moment(date).format('LLL');

export default dateParser;