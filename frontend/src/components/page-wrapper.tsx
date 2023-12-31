import styled from 'styled-components'

export const PageWrapper = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  '@media(min-width: 480px)': {
    justifyContent: 'center',
  },
})
