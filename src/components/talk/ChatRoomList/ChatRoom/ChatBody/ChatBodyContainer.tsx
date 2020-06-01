import React from 'react';
import ChatBody from './ChatBody';

export type ChatBodyContainerPropsTypes = {
  id: string;
};

export default function ChatBodyContainer({ id }: ChatBodyContainerPropsTypes) {
  return <ChatBody id={id} />;
}
