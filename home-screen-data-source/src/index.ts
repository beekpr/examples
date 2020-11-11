import type { Request, Response } from 'express'; 
import express from 'express';
import cors from 'cors';

import jwtMiddleware from './jwt';

const PORT = 3000;

const app = express();

// Make sure to set this option
app.use(cors());
app.use(jwtMiddleware());

app.get('/hello', (req: Request, res: Response) => {
    if (req.auth) {
        console.log(`Will greet user with id: ${req.auth.sub}`);
        res.send(`Hello ${req.auth.beekeeper_user.name}`);
    } else {
        res.status(401).send('Unauthorized')
    }    
});

app.listen(PORT, () => {
    console.log(`Service listening on port ${PORT}`);
});
