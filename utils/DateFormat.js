import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(customParseFormat);


export const dbDateFormatFromString = (date) => {
    const formattedDatetime = dayjs(date, 'DD/MM/YYYY HH:mm:ss', true).subtract(3, 'hour');
    return formattedDatetime.$d;
};

export const dateFromToFormat = (date, moment) => {
    if(moment === 'init') {
        const formattedDatetime = dayjs(date, 'DD/MM/YYYY', true).hour(0).minute(0).second(0);
        return formattedDatetime.$d;
    } else if(moment === 'end') {
        const formattedDatetime = dayjs(date, 'DD/MM/YYYY', true).hour(23).minute(59).second(59);
        return formattedDatetime.$d;
    }
};

export const dbDateFormatFromDate = (date) => {
    const formattedDatetime = dayjs(date).subtract(3, 'hour');
    return formattedDatetime.$d;
};

export const validateQueryDates = ({ fromDate, toDate }) => {
    if(!fromDate || !toDate) 
        return { error: true, status: 400, data: 'Missing parameters', message: 'Missing parameters' };
    else if(!dayjs(fromDate, 'DD/MM/YYYY', true).isValid() || !dayjs(toDate, 'DD/MM/YYYY', true).isValid()) 
        return { error: true, status: 400, data: 'The date format must be DD/MM/YYYY', message: 'Invalid parameters' };
    else if(dayjs(fromDate).isAfter(toDate)) 
        return { error: true, status: 400, data: 'The from date must be before the to date', message: 'Invalid parameters' };

    return { error: false };
};