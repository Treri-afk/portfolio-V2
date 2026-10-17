import { data } from 'react-router';

export const NOT_FOUND_STATUS = 404;

/** Response to throw from a loader when the requested content does not exist. */
export const notFound = () => data(null, { status: NOT_FOUND_STATUS });
