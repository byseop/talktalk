import useDatabase from '../useDatabase';

export default function useFirebase(path: string) {
  const database = useDatabase();
  const ref = database.ref(path);

  const snapshot = ref.on('value', function(snapshot) {
    return snapshot;
  });

  const set = (value: object | null, callback?: () => void) => {
    // if value is null, data will remove
    ref.set(value, function(error) {
      if (error) {
        console.error(error);
      } else {
        callback?.();
      }
    });
  };

  const off = () => ref.off();

  return [snapshot, set, off, ref];
}
