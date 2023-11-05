import axios from 'axios'

const requestSuffix = process.env['REACT_APP_FIREBASE_FNS_SUFFIX']

type GetUserParams = {
  phoneNumber: string
}
export function getUser({ phoneNumber }: GetUserParams) {
  return axios.get(`https://getuser${requestSuffix}`, {
    params: {
      phoneNumber,
    },
  })
}
