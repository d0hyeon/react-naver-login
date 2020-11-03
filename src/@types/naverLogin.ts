
export interface INaverLoginButton {
  color: string;
  type: number;
  height: number;
}

export interface INaverLoginProperties {
  clientId: string;
  callbackUrl: string;
  loginButton?: INaverLoginButton;
  isPopup: boolean;
  callbackHandle?: boolean;
}