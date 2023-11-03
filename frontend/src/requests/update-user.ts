import axios from "axios";

const requestSuffix = process.env['REACT_APP_FIREBASE_FNS_SUFFIX']

type UpdateUserParams = {
  phoneNumber: string;
  email?: string;
  displayName?: string;
}
export function updateUser({phoneNumber, email, displayName}: UpdateUserParams) {
  return axios.put(`https://updateuser${requestSuffix}`, {
      phoneNumber,
      email,
      displayName
  })
}