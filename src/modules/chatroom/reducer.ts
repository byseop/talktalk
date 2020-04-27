import { ChatActionTypes, CHAT_OPEN, CHAT_CLOSE } from './actions';

export type State = {
  isOpen: boolean;
  id: string;
};

const initialState: State = {
  isOpen: false,
  id: ''
};

export default function chat(
  state: State = initialState,
  action: ChatActionTypes
) {
  switch (action.type) {
    case CHAT_OPEN:
      return {
        ...state,
        isOpen: true,
        id: action.payload
      };
    case CHAT_CLOSE:
      return initialState;
    default:
      return state;
  }
}
