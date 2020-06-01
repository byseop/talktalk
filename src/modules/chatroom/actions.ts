import { ChatroomDataTypes } from 'src/components/talk/ChatRoomList';

export const CHAT_OPEN = 'chat/CHAT_OPEN' as const;
export const CHAT_CLOSE = 'chat/CHAT_CLOSE' as const;

export const chatOpen = (data: ChatroomDataTypes) => ({ type: CHAT_OPEN, payload: data });
export const chatClose = () => ({ type: CHAT_CLOSE });

export type ChatActionTypes =
  | ReturnType<typeof chatOpen>
  | ReturnType<typeof chatClose>;
