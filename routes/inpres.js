import { Router } from 'express';
import { searchEarthquakeEvents } from '../services/inpres/searchEarthquakeEvents.service.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(customParseFormat);

const router = Router();

/* GET Earthquake Events. 

    @query fromDate: Date
    @query toDate: Date    
*/
router.get('/events', async (req, res, next) => {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    if(!fromDate || !toDate) 
        return res.status(400).json({ error: true, status: 400, data: 'Missing parameters', message: 'Missing parameters' });
    else if(!dayjs(fromDate, 'DD/MM/YYYY', true).isValid() || !dayjs(toDate, 'DD/MM/YYYY', true).isValid()) 
        return res.status(400).json({ error: true, status: 400, data: 'The date format must be DD/MM/YYYY', message: 'Invalid parameters' });
    else if(dayjs(fromDate).isAfter(toDate)) 
        return res.status(400).json({ error: true, status: 400, data: 'The from date must be before the to date', message: 'Invalid parameters' });
    
    const result = await searchEarthquakeEvents({ fromDate, toDate });

    if(result.error) 
        return res.status(result.status).json(result);
    else
        return res.status(200).json(result.data);
});

export default router;
