declare namespace Express {
    export interface Request {
        auth?: JWTPayload;
    }
}


interface JWTPayload {
    beekeeper_version: string;
    beekeeper_user: {
        name: string;
        avatar: string;
    }
    iss: string;
    beekeeper_fqdn: string;
    jti: string;
    exp: number;
    iat: number;
    nbf: number;
    tenantuserid: string | null;
    sub: string;
}