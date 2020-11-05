import express, { Request, Response } from 'express';

import jwtMiddleware from './jwt';


const app = express();

app.use(jwtMiddleware());

app.get('/hello', (req: Request, res: Response) => {
    if (req.auth) {
        console.log(`Will greet user with id: ${req.auth.sub}`);
        res.send(`Hello ${req.auth.beekeeper_user.name}`);
    } else {
        res.status(401).send('Unauthorized')
    }    
});

app.listen(3000, () => {
    console.log('Server started');
});
