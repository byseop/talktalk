import React, { useCallback, useState } from 'react';
import CreateChatRoom from './CreateChatRoom';
import useFirebase from 'src/utils/hooks/useFirebase';
import useDatabase from 'src/utils/hooks/useDatabase';
import { SelectedChatType } from '../ChatRoomList';
import { useSelector } from 'react-redux';
import { RootState } from 'src/modules';

export default function CreateChatRoomContainer() {
  const database = useDatabase();
  const [snapshot] = useFirebase(database.ref('channels'));
  const { user } = useSelector((state: RootState) => state);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  console.log(snapshot);

  const handleUpdate = useCallback(
    (
      selectedCreateType: SelectedChatType,
      formData: { title: string; des: string }
    ) => {
      switch (selectedCreateType) {
        case 'CHANNEL':
          const newKey = database.ref('channels').push().key;
          database
            .ref(`channels/${newKey}`)
            .update(
              {
                ...formData,
                id: newKey,
                host: user.data,
                createdDate: new Date()
              },
              (error) => {
                if (!error) {
                  setIsComplete(true);
                }
              }
            );
          break;
        case 'DIRECT-MESSAGE':
          // TODO: Add direct-message
          break;
        default:
          throw new Error(`Unhandled create type '${selectedCreateType}'`);
      }
    },
    [database, user.data]
  );

  const handleCloseModal = useCallback(() => {
    setIsComplete(false);
  }, []);

  return (
    <CreateChatRoom
      update={handleUpdate}
      isComplete={isComplete}
      handleCloseModal={handleCloseModal}
    />
  );
}
