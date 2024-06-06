import { Router } from 'express';
import { scrapeEarthquakeEvents } from '../services/inpres/scrapeEarthquakeEvents.service.js';
import { searchEarthquakeEvents } from '../services/db/searchEarthquakeEvents.service.js';
import { dateFromToFormat, validateQueryDates } from '../utils/DateFormat.js';

const router = Router();

/* GET Earthquake Events directly from INPRES. 

    @query fromDate: Date (dd/mm/yyyy)
    @query toDate: Date (dd/mm/yyyy)  
*/
router.get('/events', async (req, res, next) => {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    const validation = validateQueryDates({ fromDate, toDate });

    if(validation.error) 
        return res.status(validation.status).json(validation);
    
    const result = await scrapeEarthquakeEvents({ fromDate, toDate, create: false });

    if(result.error) 
        return res.status(result.status).json(result);
    else
        return res.status(200).json(result.data);
});


/* GET Earthquake Events from DB, if they don't exist get them from INPRES and save them in DB. 

    @query fromDate: Date (dd/mm/yyyy)
    @query toDate: Date (dd/mm/yyyy)    
*/
router.get('/events/db', async (req, res, next) => {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    const validation = validateQueryDates({ fromDate, toDate });

    if(validation.error) 
        return res.status(validation.status).json(validation);

    const result = await searchEarthquakeEvents({ fromDate: dateFromToFormat(fromDate, 'init'), toDate: dateFromToFormat(toDate, 'end') });

    if(result.error) 
        return res.status(result.status).json(result);
    else
        return res.status(200).json(result.data);
});

export default router;
