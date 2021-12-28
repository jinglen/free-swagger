export const retry = async ({
  cb = () => {},
  time = 500,
  retryNumber = 10,
  endCondition = res => res,
  success = () => {},
  error = () => {}
}) => {
  const res = await cb();
  const shouldEnd = endCondition(res);
  if (shouldEnd) {
    success(res);
    return;
  }
  if (shouldEnd || retryNumber < 0) {
    error(res);
    return;
  }
  await wait(time);
  await retry({
    cb,
    time,
    endCondition,
    retryNumber: retryNumber - 1,
    success,
    error
  });
};

export const waitUntil = async (cb, time = 500, retryNumber = 10) => {
  const shouldEnd = await cb();
  if (shouldEnd) {
    return;
  } else {
    if (retryNumber < 0) {
      return Promise.reject(new Error("timeout"));
    } else {
      await wait(time);
      return waitUntil(cb, time, retryNumber - 1);
    }
  }
};

export const wait = async (time = 500) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, time)
  );

export function scriptLog(sth) {
  console.log("xuece-user-script:", sth);
}

export function handleTimeoutError(error) {
  scriptLog(error);
}
