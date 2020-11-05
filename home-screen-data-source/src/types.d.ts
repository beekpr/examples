declare namespace Express {
    export interface Request {
        auth?: JWTPayload;
    }
}


interface JWTPayload {
    /** Version number of JWT */
    beekeeper_version: string;
    beekeeper_user: {
        name: string;
        avatar: string;
    }
    /** Issuer */
    iss: string;
    /** Fully Qualified Domain Name of Tenant */
    beekeeper_fqdn: string;
    /** JWT Token Identifier */
    jti: string;
    /** Expiration Date */
    exp: number;
    /** Issued At */
    iat: number;
    /** Don't use before */
    nbf: number;
    /** Tenant User Id */
    tenantuserid: string | null;
    /** Subject, in this case user id */
    sub: string;
}