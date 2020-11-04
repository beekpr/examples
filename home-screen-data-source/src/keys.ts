import axios from 'axios';


const publicKeyPath = (fqdn: string) => `https://${fqdn}/api/2/extensions/jwt/public_key`;

/**
 * Fetches the public key from the API for a tenant specified by FQDN
 * @param fqdn fully qualified domain name of a tenant e.g. tenant.beekeeper.io
 * @returns public key as string
 */
export async function getPublicKey(fqdn: string): Promise<string> {
    const path = publicKeyPath(fqdn);
    console.log(`Will make new request to ${path}`);
    const response = await axios.get(path);
    return response.data;
}