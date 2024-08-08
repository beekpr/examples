import ky from 'ky';

/**
 * At the moment we use ky as our http client of choice. This might, however, change in the future.
 */
export type HttpClient = typeof ky;
