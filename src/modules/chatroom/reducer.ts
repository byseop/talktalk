import { ChatActionTypes, CHAT_OPEN, CHAT_CLOSE } from './actions';
import { ChatroomDataTypes } from 'src/components/talk/ChatRoomList';

export type State = {
  isOpen: boolean;
  data: ChatroomDataTypes | null;
};

const initialState: State = {
  isOpen: false,
  data: null
};

export default function chat(
  state: State = initialState,
  action: ChatActionTypes
): State {
  switch (action.type) {
    case CHAT_OPEN:
      return {
        ...state,
        isOpen: true,
        data: action.payload
      };
    case CHAT_CLOSE:
      return initialState;
    default:
      return state;
  }
}
