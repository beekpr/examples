import { MobileBridge } from './bridge';
declare let singletonInstance: MobileBridge | null;
export default singletonInstance;
export { isIos, isAndroid } from './platform';
export { State, StateProperties } from './page';
export { ToastType } from './ui';
export { default as NotSupportedError } from './errors/not-supported-error';
export { MobileBridge } from './bridge';
