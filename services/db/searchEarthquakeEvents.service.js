import { EventRepository } from '../../repository/event.repository.js';
import { scrapeEarthquakeEvents } from '../inpres/scrapeEarthquakeEvents.service.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';

dayjs.extend(isBetween);

export async function searchEarthquakeEvents({ fromDate, toDate }) {
    try {
        const datesInDb = await EventRepository.getEarthquakeEventsUniqueDays(fromDate, toDate);
        const interval = dayjs(toDate).diff(dayjs(fromDate), 'day');    
        const datesToSearch = [];

        for(let i = 0; i <= interval; i++) {
            const date = dayjs(fromDate).add(i, 'day').format('YYYY-MM-DD');
            if(!datesInDb.includes(date)) datesToSearch.push(date);
        }

        let scrappedEvents = [];

        if(datesToSearch.length > 0) {
            const dateFromFormatted = dayjs(datesToSearch[0], 'YYYY-MM-DD', true).format('DD/MM/YYYY');
            const dateToFormatted = dayjs(datesToSearch[datesToSearch.length - 1], 'YYYY-MM-DD', true).format('DD/MM/YYYY');

            const { error, data } = await scrapeEarthquakeEvents({ fromDate: dateFromFormatted, toDate: dateToFormatted });    
            
            if(!error) scrappedEvents = data;
            else return { error: true, status: 500, data: error };
        }

        const eventsInDb = await EventRepository.getEarthquakeEventsBetweenDates(fromDate, toDate);

        const events = [ ...eventsInDb, ...scrappedEvents ];

        return { error: false, status: 200, data: events };
    } catch (error) {
        console.log(error);

        return { error: true, status: 500, data: error };
    }
}