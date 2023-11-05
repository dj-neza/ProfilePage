import styled from 'styled-components'

export const ContentWrapper = styled.div<{ $verticallyCenter?: boolean }>(
  ({ $verticallyCenter = false }) => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '70%',
    marginTop: '10%',
    backgroundColor: 'white',
    border: '1px solid #E5E5E5',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...($verticallyCenter && {
      justifyContent: 'center',
    }),
    '@media(min-width: 480px)': {
      width: 360,
      minHeight: '50%',
      height: 'unset',
      borderRadius: 16,
      marginTop: 'unset',
    },
  }),
)
