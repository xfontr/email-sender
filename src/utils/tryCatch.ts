const tryCatch = async (
  callback: Function,
  ...args: unknown[]
): Promise<[any, null] | [null, any]> => {
  try {
    const response = await callback(...args);
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export default tryCatch;
