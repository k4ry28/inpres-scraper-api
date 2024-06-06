import Event from '../models/Event.js';
import { dbDateFormatFromString, dbDateFormatFromDate } from '../utils/DateFormat.js';
import { Op, fn, col } from 'sequelize';

export class EventRepository {
    static async getEarthquakeEvents() {
        return Event.findAll();
    }

    static async getEarthquakeEventById(id) {
        return Event.findByPk(id);
    }

    static async getEarthquakeEventsBetweenDates(fromDate, toDate) {
        return Event.findAll({
            where: { datetime: { [Op.between]: [ dbDateFormatFromDate(fromDate), dbDateFormatFromDate(toDate) ] } },
        });
    }

    static async insertEarthquakeEvent(event) {
        event.datetime = dbDateFormatFromString(event.datetime);
        return Event.create(event);
    }

    static async insertManyEarthquakeEvents(events) {
        events.forEach((event) => {
            event.datetime = dbDateFormatFromString(event.datetime);
        });

        return Event.bulkCreate(events, {
            validate: true
        });
    }

    static async updateEarthquakeEvent(id, event) {
        return Event.update(event, { where: { id } });
    }

    static async deleteEarthquakeEvent(id) {
        return Event.destroy({ where: { id } });
    }

    static async getEarthquakeEventsUniqueDays(fromDate, toDate) {
        const events = await Event.findAll({
            attributes: [ 
                [ fn('DATE', col('datetime')), 'datetime' ]
            ],
            where: {
                datetime: { [Op.between]: [ dbDateFormatFromDate(fromDate), dbDateFormatFromDate(toDate) ] }
            },
            group: [ 
                [ fn('DATE', col('datetime')) ]
            ],
            raw: true
        });

        return events.map(event => event.datetime);
    }
}
