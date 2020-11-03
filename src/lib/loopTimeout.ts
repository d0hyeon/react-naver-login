type TCallback = () => boolean;
type TLoopTimeout = (callback: TCallback, timer?: number) => number;

const MAX_LOOP_COUNT = 10;

const loopTimeout = ((_count: number) => {
  let count = _count;
  let timerId = 0;

  const loopTimeoutInner:TLoopTimeout = (callback, timer = 300) => {
    if(count > MAX_LOOP_COUNT) {
      clearTimeout(timerId);
      return timerId;
    }

    timerId = setTimeout(() => {
      if(callback) {
        const isStop = callback();
        if(!isStop) {
          loopTimeoutInner(callback, timer);
          count ++;
        }
      }
    }, timer);

    return timerId;
  };

  return loopTimeoutInner;
})(0);

export default loopTimeout;