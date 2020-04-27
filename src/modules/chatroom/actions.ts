export const CHAT_OPEN = 'chat/CHAT_OPEN' as const;
export const CHAT_CLOSE = 'chat/CHAT_CLOSE' as const;

export const chatOpen = (id: string) => ({ type: CHAT_OPEN, payload: id });
export const chatClose = () => ({ type: CHAT_CLOSE });

export type ChatActionTypes =
  | ReturnType<typeof chatOpen>
  | ReturnType<typeof chatClose>;
