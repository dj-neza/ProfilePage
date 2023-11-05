import { CSSObject } from 'styled-components'

export const firebaseUiOverrides: CSSObject = {
  '.firebaseui-container': {
    background: 'white',
    marginBottom: '15px',
    minHeight: '150px',
    paddingTop: '10px',
    borderRadius: '20px',
    boxShadow: 'none',
  },
  '.firebaseui-card-header': {
    display: 'none',
  },
  '.firebaseui-container.firebaseui-page-provider-sign-in': {
    background: 'transparent',
    boxShadow: 'none',
    minHeight: 0,
    marginBottom: 0,
    paddingTop: 0,
  },
  '.firebaseui-container.firebaseui-id-page-callback': {
    background: 'transparent',
    boxShadow: 'none',
    marginTop: '40px',
    height: '84px',
    minHeight: 0,
    marginBottom: 0,
    paddingTop: 0,
  },
  '.firebaseui-form-actions .mdl-button--raised.mdl-button--colored.firebaseui-button':
    {
      border: '1px solid',
      backgroundColor: '#055C9D',
      borderColor: '#055C9D',
      borderRadius: 9999,
      boxShadow: 'none',
    },
  '.firebaseui-form-actions .mdl-button--primary.firebaseui-button': {
    border: '1px solid',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: '#003060',
    borderRadius: 9999,
    boxShadow: 'none',
  },
  '.firebaseui-textfield.mdl-textfield .firebaseui-label:after': {
    backgroundColor: '#055C9D',
  },
  '.firebaseui-link': {
    color: '#055C9D',
  },
  '.firebaseui-id-dismiss-info-bar': {
    display: 'block',
  },
}
