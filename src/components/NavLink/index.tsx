import React from 'react';
import { Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import Link from 'next/link'
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
              href="/login"
              target={target}
              onClick={() => {
                signOut(auth);
              }}
            >
              <a>
                {children}
              </a>
            </Link>
            <Box height="100%" width={8} bgcolor="#fff" border="3px 0 0 3px" />
          </LinkWrapper>
        ) : (
          <LinkWrapper active={active} collapsed={collapsed}>
            <Link href={href} target={target} {...props}>
              <span style={{
                display: "flex",
                alignItems: "center",
                columnGap: "20px",
                marginLeft: 0
              }}>
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
              </span>
            </Link>
          </LinkWrapper>
        )}
      </li>
    </Wrapper>
  );
};

export { NavLink };
