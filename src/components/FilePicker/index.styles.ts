import { styled, Box } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  '& .dropzone-text': {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: '16px',
    fontWeight: 500,
  },
  '& .dropzone-files': {
    color: '#FFFFFF78',
    fontSize: 12,
    lineHeight: '15px',
    fontWeight: 500,
    marginTop: 12,
  },
  '& .MuiDropzoneArea-root': {
    padding: '31px 130px 20px',
    minHeight: 'auto',
    background: 'transparent',
    border: 'none',
  },
  '& .MuiDropzoneArea-textContainer': {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  [theme.breakpoints.down('md')]: {
    '& .MuiDropzoneArea-root': {
      padding: '30px 25px',
    },
  },
}));

export const DropzoneContainer = styled(Box)({
  backgroundColor: '#131322',
  border: '0.4px dashed #FFFFFF',
  borderRadius: 10,

  '& .upload-status': {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '22px',
    color: '#FFFFFF',
  },
});

export const ProgressBar = styled(Box)({
  display: 'flex',
  flexDirection: 'column',

  '& .progress-percent': {
    fontSize: 13,
    lineHeight: '16px',
    color: '#A3A1A1',
    marginTop: 12,
  },
  '& .MuiIconButton-root': {
    padding: 12,
    marginLeft: 48,
    background: 'rgba(255, 255, 255, 0.09)',
  },
});

export const PreviewBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});
