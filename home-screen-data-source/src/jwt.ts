import jwt from 'express-jwt';
import { getPublicKey } from './keys';
import * as Store from './store';
import { FQDN_REGEX } from './utils';


const JWT_FQDN_KEY = 'beekeeper_fqdn';

function validateAndGetFQDN(payload: any): string {
    if (!payload || !payload[JWT_FQDN_KEY]) {
        throw new Error('No FQDN in JWT');
    }
    
    const fqdn = payload[JWT_FQDN_KEY];

    if (!FQDN_REGEX.test(fqdn)) {
        throw new Error(`FQDN ${fqdn} is invalid`);
    }
    return fqdn;
}

const secretCallback: jwt.SecretCallback = (_, payload, done) => {
    let fqdn: string;
    try {
        fqdn = validateAndGetFQDN(payload);
    } catch (error) {
        done(error);
        return;
    }
    
    console.log(`FQDN in JWT is ${fqdn}`);
    
    Store
        .has(fqdn)
        .then(async (exists) => {
            let key;
            if (exists) {
                console.log('Will load public key from store');
                key = await Store.get(fqdn);
            } else {
                console.log('Will load public key from API');
                key = await getPublicKey(fqdn);
                await Store.set(fqdn, key);
            }
            return key;
        })
        .then(key => done(null, key))
        .catch(error => done(error));
};

const options: jwt.Options = {
    secret: secretCallback,
    algorithms: ['RS256'],
    requestProperty: 'auth',
    issuer: 'Beekeeper AG',
};

export default function middleware(jwtOptions?: object) {
    return jwt(Object.assign({}, options, jwtOptions));
}
