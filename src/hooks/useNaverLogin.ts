import * as React from 'react';
import {INaverLoginProperties} from '../@types/naverLogin';
import {NAVER_SCRIPT_SRC} from '../lib/constants';
import { createScript } from '../lib/createScript';

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
    if(!isLoadedScript) {
      createScript(NAVER_SCRIPT_SRC)
        .then(() => {
          setIsLoadedScript(true);  
        })
    }
  }, [isLoadedScript]);
  
  return {
    loading: !isLoadedScript,
    naverLoginInit,
  }
};

export default useNaverLogin;