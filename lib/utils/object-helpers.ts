export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> =>
  Object.keys(obj).reduce(
    (acc, key) => {
      if (keys.indexOf(key as K) !== -1) {
        return acc;
      }

      return {
        ...acc,
        // @ts-expect-error
        [key]: obj[key],
      };
    },
    {} as Omit<T, K>
  );
