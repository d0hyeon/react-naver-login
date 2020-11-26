import * as React from 'react';
import {INaverLoginProperties} from '../@types/naverLogin';
import useNaverLogin from '../hooks/useNaverLogin';
import './default.css';

const NaverLogin: React.FC<INaverLoginProperties> = ({
  clientId,
  callbackUrl,
  loginButton = {color: "green", type: 2, height: 42},
  isPopup,
  callbackHandle = true,
  children
}) => {
  if(!('browser' in process)) {
    return null;
  }
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const {naverLoginInit, loading} = useNaverLogin({
    clientId,
    callbackUrl,
    loginButton,
    isPopup,
    callbackHandle
  }) || {};
  

  React.useEffect(() => {
    if(!loading && buttonRef.current) {
      naverLoginInit && naverLoginInit();
    }
  }, [loading, buttonRef]);
  
  return (
    <>
      {children && (
        <>
          <div
            onClick={() => {
              const {current} = buttonRef;
              if(current !== null) {
                const a = current.querySelector('a');
                if(a) a.click();
              }
            }}
          >
            {children}
          </div>
        </>  
      )}
      <div className={children ? 'hide' : ''}>
        <div 
          id="naverIdLogin"
          ref={buttonRef}
        />
      </div>
    </>
  )
};

NaverLogin.displayName = 'NaverLogin';
export default React.memo(NaverLogin);

