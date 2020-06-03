import React, { useState, useCallback } from 'react';

export default function ChatInput({
  pushMessage
}: {
  pushMessage: (value: string) => void;
}) {
  const [text, setText] = useState<string>('');
  const fnPushMessage = useCallback(() => {
    pushMessage(text);
    setText('');
  }, [pushMessage, text]);
  return (
    <>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={fnPushMessage}>전송</button>
    </>
  );
}
