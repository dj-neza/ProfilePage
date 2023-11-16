import { firebaseFunctions } from '../vendor/firebase'
import { httpsCallable } from 'firebase/functions'

type UpdateUserParams = {
  email?: string
  name?: string
}
export function updateUser({ email, name }: UpdateUserParams) {
  const updateUserFn = httpsCallable(firebaseFunctions, 'updateUser')
  return updateUserFn({ email, name })
}