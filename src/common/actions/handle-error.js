export const ERROR = 'ERROR';

export function handleError(errorMessage) {
  return {
    type: ERROR,
    error: errorMessage
  }
}