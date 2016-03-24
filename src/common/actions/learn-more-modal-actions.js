export const OPEN_LEARN_MORE_MODAL = 'OPEN_LEARN_MORE_MODAL';
export const CLOSE_LEARN_MORE_MODAL = 'CLOSE_LEARN_MORE_MODAL';

export function openModal() {
  return {
    type: OPEN_LEARN_MORE_MODAL
  }
}

export function closeModal() {
  return {
    type: CLOSE_LEARN_MORE_MODAL
  }
}