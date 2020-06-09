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
  const handlePressEnter = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        fnPushMessage();
      }
    },
    [fnPushMessage]
  );
  return (
    <>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handlePressEnter}
      />
      <button onClick={fnPushMessage}>전송</button>
    </>
  );
}
