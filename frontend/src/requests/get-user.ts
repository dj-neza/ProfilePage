import { firebaseFunctions } from '../vendor/firebase'
import { httpsCallable } from 'firebase/functions'

export function getUser() {
  const getUserFn = httpsCallable(firebaseFunctions, 'getUser')
  return getUserFn()
}
