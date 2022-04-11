import React, { useState } from 'react';
import { DropzoneArea } from 'react-mui-dropzone';
import {
  Box,
  LinearProgress,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import {
  Container,
  DropzoneContainer,
  ProgressBar,
  PreviewBox,
} from './index.styles';
import FileUploadIcon from '../../assets/icons/file-upload-icon.svg';
import CloseIcon from '../../assets/icons/close_icon.svg';
import RubbishIcon from '../../assets/icons/rubbish_icon.svg';
import PictureIcon from '../../assets/icons/img_icon.svg';
import SuccessIcon from '../../assets/icons/success_icon.svg';

type FilePickerProps = {
  label?: string;
  file?: File;
  onChangeFile: (arg: File) => void;
  onDeleteFile: () => void;
};

export const FilePicker = ({
  label,
  file,
  onChangeFile,
  onDeleteFile,
}: FilePickerProps) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const handleChangeFile = (files: File[]) => {
    onChangeFile(files[files.length - 1]);
  };
  return (
    <Container>
      {label && (
        <Box
          mb="11px"
          fontSize={{ xs: 13, md: 18 }}
          fontWeight={500}
          color="#fff"
        >
          {label}
        </Box>
      )}
      <DropzoneContainer>
        {/*
        // @ts-ignore */}
        <DropzoneArea
          acceptedFiles={['image/*']}
          showPreviewsInDropzone={false}
          showAlerts={false}
          // @ts-ignore
          dropzoneText={
            matchDownMd ? (
              <Typography color="#A3A1A1" fontSize={12} ml="11px">
                drag file here
              </Typography>
            ) : (
              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
                ml="52px"
              >
                <Box className="dropzone-text">
                  Select a file or drag and drop here
                </Box>
                <Box className="dropzone-files">
                  JPG, PNG or PDF, file size no more than 10MB
                </Box>
              </Box>
            )
          }
          Icon={() => <img src={FileUploadIcon} />}
          onChange={handleChangeFile}
        />
        {/* <ProgressBar padding="0 145px 40px">
          <span className="upload-status">Uploading...</span>
          <span className="progress-percent">40%</span>
          <Box display="flex" alignItems="center">
            <LinearProgress variant="determinate" value={50} />
            <IconButton color="secondary" aria-label="add an alarm">
              <img src={CloseIcon} />
            </IconButton>
          </Box>
        </ProgressBar> */}
        {file && (
          <PreviewBox padding="0 145px 40px">
            {/* <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <span className="upload-status">Completed</span>
              <img src={SuccessIcon} />
            </Box> */}
            <Box
              display="flex"
              justifyContent="space-between"
              // mt="30px"
              alignItems="center"
            >
              <span>
                <img src={PictureIcon} style={{ marginRight: 8 }} />
                {file?.name}
              </span>
              <Box onClick={onDeleteFile}>
                <img
                  src={RubbishIcon}
                  style={{ marginRight: 8, cursor: 'pointer' }}
                />
              </Box>
            </Box>
          </PreviewBox>
        )}
      </DropzoneContainer>
    </Container>
  );
};
