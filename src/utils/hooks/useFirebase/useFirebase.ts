import { FirebaseError, database } from 'firebase';
import { useEffect, useCallback, useReducer } from 'react';

export type useFirebaseStateTypes = {
  isOn: boolean;
  loading: boolean;
  data: any;
  error: FirebaseError | null;
};

export default function useFirebase(
  ref: database.Reference | database.Query,
  event_type: database.EventType = 'value'
): [
  useFirebaseStateTypes,
  (value: Object, callback?: (() => void) | undefined) => void,
  database.Reference | database.Query
] {
  const initialState: useFirebaseStateTypes = {
    isOn: false,
    loading: false,
    data: null,
    error: null
  };

  const FIREBASE_INITIALIZE = 'FIREBASE_INITIALIZE' as const;
  const FIREBASE_LISTEN = 'FIREBASE_LISTEN' as const;
  const FIREBASE_OFF = 'FIREBASE_OFF' as const;
  const FIREBASE_ERROR = 'FIREBASE_ERROR' as const;

  const firebaseInitialize = () => ({ type: FIREBASE_INITIALIZE });
  const firebaseListen = (payload: any) => ({
    type: FIREBASE_LISTEN,
    payload
  });
  const firebaseOff = () => ({ type: FIREBASE_OFF });
  const firebaseError = (payload: FirebaseError) => ({
    type: FIREBASE_ERROR,
    payload
  });

  type useFirebaseActionTypes =
    | ReturnType<typeof firebaseInitialize>
    | ReturnType<typeof firebaseListen>
    | ReturnType<typeof firebaseOff>
    | ReturnType<typeof firebaseError>;

  function reducer(
    state: useFirebaseStateTypes = initialState,
    action: useFirebaseActionTypes
  ): useFirebaseStateTypes {
    switch (action.type) {
      case FIREBASE_INITIALIZE:
        return {
          ...state,
          isOn: true,
          loading: true,
          data: null,
          error: null
        };
      case FIREBASE_LISTEN:
        return {
          ...state,
          loading: false,
          data: action.payload
        };
      case FIREBASE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case FIREBASE_OFF:
        return initialState;
      default:
        return state;
    }
  }

  const [firebaseState, dispatch] = useReducer(reducer, initialState);

  const update = useCallback(
    (value: Object, callback?: () => void) => {
      //if value is null, data will remove
      if ('queryParams_' in ref) {
        (ref as database.Reference).update(value, function(error) {
          if (error) {
            console.error(error);
          } else {
            callback?.();
          }
        });
      } else {
        const reference = (ref as database.Query).ref;
        reference.update(value, function(error) {
          if (error) {
            console.error(error);
          } else {
            callback?.();
          }
        });
      }
    },
    [ref]
  );

  useEffect(() => {
    dispatch(firebaseInitialize());
    ref.on(
      event_type,
      snapshot => {
        dispatch(firebaseListen(snapshot.val()));
      },
      (error: FirebaseError) => {
        if (error) {
          dispatch(firebaseError(error));
        }
      }
    );

    return () => {
      ref.off();
      dispatch(firebaseOff());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [firebaseState, update, ref];
}
