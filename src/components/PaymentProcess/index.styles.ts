import { styled, Button, IconButton, Stack } from '@mui/material';

export const Container = styled(Stack)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #05050d;
  border: 1px solid #199fd9;
  border-radius: 10px;
  box-sizing: border-box;

  & .MuiStepLabel-label {
    font-style: italic;

    &.Mui-completed {
      color: #fff;
    }
    &.Mui-active {
      color: #fff;
    }
  }

  ${(props) => props.theme.breakpoints.down('md')} {
    border-width: 1px 1px 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    position: relative;
    top: 0px;
    left: 0px;
    transform: translate(0%, 0px);
    & .payment-step-up-arrow {
      width: 66px;
      height: 66px;
    }
    & .MuiStepLabel-label {
      font-size: 10px;
    }
  }
`;

export const ConfirmButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 46,
  borderRadius: 5,
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '100%',
  color: '#fff',
  width: 670,
  padding: '14px 0',
  [theme.breakpoints.down('md')]: {
    fontSize: 10,
    marginTop: 22,
    width: 236,
    padding: '8px 0',
    '& img': {
      width: 10,
      height: 10,
    },
  },
}));

export const CloseButton = styled(IconButton)({
  position: 'absolute',
  background: '#9E9E9E20',
  borderRadius: '50%',
  cursor: 'pointer',
  top: 10,
  right: 14,
});
