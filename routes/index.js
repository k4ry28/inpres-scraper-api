import { Router } from 'express';
const router = Router();

/* GET Server Status. */
router.get('/', function (req, res, next) {
    res.send('Server is running...');
});

export default router;
