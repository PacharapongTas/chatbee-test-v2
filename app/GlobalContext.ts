import { createContext, SetStateAction, Dispatch, useContext } from 'react';

export interface INotificationBar {
  title: string,
  visible: boolean,
  variant: 'success' | 'warning'
}

export interface IGlobalContext {
  notificationBar: INotificationBar
}

export const GlobalContext = createContext<[IGlobalContext, Dispatch<SetStateAction<IGlobalContext>>]>([{
  notificationBar: {
    title: '',
    visible: false,
    variant: 'success'
  }
}, () => { }]);

export type ISetNotificationBar = (title: string, variant: 'success' | 'warning', visible: boolean) => void

let timeouts = [];

function clearAllNotificationTimeouts() {
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
}
//quick reset of the timer array you just cleared
timeouts = [];
}

export const useNotificationBarContext = (): [INotificationBar, ISetNotificationBar] => {
  const contexts = useContext(GlobalContext);
  const setGlobalContext = contexts[1]

  const notificationBar = contexts[0].notificationBar
  const setNotificationBar: ISetNotificationBar = (title, variant, visible) => {



    setGlobalContext(globalContext => ({
      ...globalContext,
      notificationBar: {
        title,
        variant,
        visible,
      }
    }))

    clearAllNotificationTimeouts()
    // auto close after 4secs
    timeouts.push(setTimeout(() => {
      setGlobalContext(globalContext => ({
        ...globalContext,
        notificationBar: {
          title,
          visible: false,
          variant
        }
      }))
    }, 4000));
  }

  return [notificationBar, setNotificationBar]
}