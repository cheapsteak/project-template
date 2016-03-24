import {
  OPEN_LEARN_MORE_MODAL,
  CLOSE_LEARN_MORE_MODAL
} from 'common/actions/learn-more-modal-actions';


export default function learnMoreModal(state = false, action) {
  switch(action.type) {
    case OPEN_LEARN_MORE_MODAL:
      return true;
    case CLOSE_LEARN_MORE_MODAL:
      return false;
    default:
      return state;
  }
}