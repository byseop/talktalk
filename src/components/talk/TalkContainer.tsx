import React, { useEffect } from 'react';
import Talk from './Talk';
import { useSelector } from 'react-redux';
import { RootState } from 'src/modules';

export default function TalkContainer() {
  const user = useSelector((state: RootState) => state.user);

  const { data } = user;

  if (data) {
    return <Talk user={data} />;
  }
  return null;
}
