import React, { useState } from 'react';
import { Button, TextField, InputAdornment } from '@mui/material';
import { Container } from './index.styles';
import MailIcon from '../../SVGIcons/MailIcon';

interface SubscribeInputProps {
  onSubscribe: (email: string) => void;
}

export const SubscribeInput = ({ onSubscribe }: SubscribeInputProps) => {
  const [email, setEmail] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Container>
      <TextField
        placeholder="enter your email address"
        value={email}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button className="suffix" onClick={() => onSubscribe(email)}>
        Subscribe
      </Button>
    </Container>
  );
};
