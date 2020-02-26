import * as firebase from 'firebase/app';
import 'firebase/database';
import { useState } from 'react';

export default function useDatabase() {
  const [database] = useState<firebase.database.Database>(
    firebase.database()
  );

  return database;
}
