import * as React from 'react';
import {INaverLoginProperties} from '../@types/naverLogin';
import {NAVER_SCRIPT_SRC} from '../lib/constants';
import loopTimeout from '../lib/loopTimeout';

declare global {
  interface Window {
    naver: any
  }
}
 
type TNaverLogin = any;

interface IUserNaverLoginResult {
  loading: boolean;
  naverLoginInit: () =>TNaverLogin
}

type TUserNaverLogin = (parameter: INaverLoginProperties) => null | IUserNaverLoginResult;

const createScript = (callback?: () => void) => {
  const currentScript = document.querySelector(`script[src='${NAVER_SCRIPT_SRC}']`);
  const script: any = currentScript ?? document.createElement('script');
  
  if(!currentScript) {
    script.src = NAVER_SCRIPT_SRC;
    document.body.appendChild(script);
  }

  script.addEventListener('load', () => {
    callback && callback();
  });
};

const useNaverLogin:TUserNaverLogin = ({
  clientId,
  callbackUrl,
  isPopup,
  loginButton = {color: "green", type: 2, height: 42},
  callbackHandle = true
}) => {
  if(!('browser' in process)) {
    return null;
  }
  const [isLoadedScript, setIsLoadedScript] = React.useState<boolean>(window?.naver?.LoginWithNaverId ? true : false);

  const naverLoginInit = React.useCallback(() => {
    if(isLoadedScript) {
      const naverLogin = new window.naver.LoginWithNaverId(
        {
          clientId,
          callbackUrl,
          isPopup,
          loginButton,
          callbackHandle
        }
      );

      naverLogin.init();
      return naverLogin;
    }
    
    return null;
  }, [isLoadedScript]);

  React.useEffect(() => {
    let timerId: number = 0;
    if(!isLoadedScript) {
      createScript(() => {
        timerId = loopTimeout(() => {
          if(window?.naver?.LoginWithNaverId) {
            setIsLoadedScript(true);
            return true;
          } 

          return false;
        }, 500);
      });
    }

    return () => {
      timerId && clearTimeout(timerId);
      setIsLoadedScript(true)
    };
  }, [isLoadedScript]);
  
  return {
    loading: !isLoadedScript,
    naverLoginInit,
  }
};

export default useNaverLogin;