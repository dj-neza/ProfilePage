import styled from 'styled-components'
import {
  NotificationConfig,
  useNotificationContext,
} from '../contexts/notification-context'

const NotificationsListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  bottom: 32,
  left: 16,
  minWidth: 320,
  maxWidth: 350,
  zIndex: 10,
  gap: 16,
})

const Container = styled.div({
  backgroundColor: '#003060',
  paddingBlock: 12,
  paddingInline: 16,
  borderRadius: 16,
  fontSize: 18,
  lineHeight: '24px',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
})

const CloseIcon = styled.div({
  cursor: 'pointer',
  display: 'block',
  boxSizing: 'border-box',
  width: 24,
  height: 24,
  borderRadius: '100%',
  background:
    '-webkit-linear-gradient(-45deg, transparent 0%, transparent 46%, white 46%,  white 56%,transparent 56%, transparent 100%), -webkit-linear-gradient(45deg, transparent 0%, transparent 46%, white 46%,  white 56%,transparent 56%, transparent 100%)',
})

export function Notification({ message, onClose }: NotificationConfig) {
  if (!message) {
    return null
  }

  return (
    <Container>
      {message}
      <CloseIcon onClick={onClose} />
    </Container>
  )
}

export function Notifications() {
  const { notifications } = useNotificationContext()
  console.log(notifications)
  return (
    <NotificationsListContainer>
      {notifications.map((notification) => (
        <Notification {...notification} />
      ))}
    </NotificationsListContainer>
  )
}
