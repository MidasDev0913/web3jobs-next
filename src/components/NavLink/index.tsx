import React from 'react';
import { Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

import { NavLinkProps } from '../../interfaces';
import { Wrapper, LinkWrapper } from './index.styles';
import { auth } from '../../firebase';

const NavLink = ({
  children,
  href,
  id,
  target,
  active,
  collapsed,
  ...props
}: NavLinkProps) => {
  return (
    <Wrapper>
      <li>
        {id === 'sign_out' ? (
          <LinkWrapper collapsed={collapsed}>
            <Box height="100%" width={8} bgcolor="#fff" border="3px 0 0 3px" />
            <Link
              to="/login"
              target={target}
              onClick={() => {
                signOut(auth);
              }}
            >
              {children}
            </Link>
            <Box height="100%" width={8} bgcolor="#fff" border="3px 0 0 3px" />
          </LinkWrapper>
        ) : (
          <LinkWrapper active={active} collapsed={collapsed}>
            <Link to={href} target={target} {...props}>
              {active && collapsed && (
                <Box
                  height="30px"
                  left={0}
                  width={8}
                  bgcolor="#fff"
                  borderRadius="0px 3px 3px 0"
                  position="absolute"
                />
              )}
              {children}
            </Link>
          </LinkWrapper>
        )}
      </li>
    </Wrapper>
  );
};

export { NavLink };
