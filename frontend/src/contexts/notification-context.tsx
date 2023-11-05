import type { ReactNode } from 'react'
import { useState, useCallback, createContext, useContext } from 'react'

type NotificationProps = {
  message: string
  onClose?: () => void
}

export type NotificationConfig = NotificationProps & {
  key?: string
}

const NOTIFICATION_TIMEOUT = 4000

type NotificationContextType = {
  notifications: NotificationConfig[]
  addNotification: (config: NotificationConfig) => void
}

// @ts-ignore
const NotificationContext = createContext<NotificationContextType>()

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationConfig[]>([])

  const addNotification = useCallback(
    ({ ...notificationProps }: NotificationConfig) => {
      const removeNotification = () => {
        setNotifications((notifications) => [
          ...notifications.slice(0, notifications.indexOf(notificationProps)),
          ...notifications.slice(notifications.indexOf(notificationProps) + 1),
        ])
      }

      const timeoutId = setTimeout(removeNotification, NOTIFICATION_TIMEOUT)

      notificationProps.onClose = () => {
        clearTimeout(timeoutId)
        removeNotification()
      }
      notificationProps.key = timeoutId.toString()

      setNotifications((notifications) => [...notifications, notificationProps])
    },
    [],
  )

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () =>
  useContext<NotificationContextType>(NotificationContext)
