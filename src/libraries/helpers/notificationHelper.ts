import { ElNotification } from 'element-plus'

enum notificationType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}

const notification = (type: notificationType, message: string) => {
  ElNotification({
    message,
    type
  })
}

export {
  notification,
  notificationType
}
