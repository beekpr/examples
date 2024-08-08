import { Client } from '../client';
/**
 * Make sure that the client implements a minimum bridge version, throwing a `NotSupportedError`
 * if it doesn't.
 *
 * @param client The Client to check the version against
 * @param featureName The feature's name that needs the check. Used to generate the error message.
 * @param minVersion The minimum version of the bridge required.
 * @throws NotSupportedError When the version constraint is not matched.
 */
export declare function requireBridgeVersion(client: Client, featureName: string, minVersion: string): void;
