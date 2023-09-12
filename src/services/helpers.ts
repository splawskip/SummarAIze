// Redux helpers.
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`.
 *
 * @param error - The error to be narrowed.
 * @returns `true` if the error is a `FetchBaseQueryError`, `false` otherwise.
 */
function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export default isFetchBaseQueryError;
