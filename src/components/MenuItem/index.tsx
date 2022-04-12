import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Container, MenuItem, SubMenuItem, MenuPopper } from './index.styles';
import { Menu, Grow, Popper, ClickAwayListener, Paper } from '@mui/material';

import ArrowUpIcon from '../../assets/icons/arrow_up_tri_icon.svg';
import ArrowDownIcon from '../../assets/icons/arrow_down_tri_icon.svg';

export type TMenuItem = {
  text: string;
  link?: string;
  subMenus?: TMenuItem[];
};

type TAppMenuItem = {
  item: TMenuItem;
  openSubmenu: boolean;
  setOpenSubmenu: (arg: TMenuItem | null) => void;
  handleGoToPage: (arg: string | undefined) => void;
};

export const AppMenuItem = ({
  item,
  handleGoToPage,
  openSubmenu,
  setOpenSubmenu,
}: TAppMenuItem) => {
  const { link, text, subMenus } = item;
  const router = useRouter();
  const url = router.pathname;
  const anchorRef = React.useRef<HTMLAnchorElement>(null);

  const handleToggle = () => {
    setOpenSubmenu(item);
  };

  const handleClose =
    (link: string | undefined) => (event: Event | React.SyntheticEvent) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
      if (link) {
        handleGoToPage(link);
      }

      setOpenSubmenu(null);
    };

  const prevOpen = React.useRef(openSubmenu);
  React.useEffect(() => {
    if (prevOpen.current === true && openSubmenu === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = openSubmenu;
  }, [openSubmenu]);

  return (
    <Container>
      <MenuItem
        active={link === url}
        onClick={() => (link ? handleGoToPage(link) : {})}
        ref={anchorRef}
        id="composition-button"
        aria-controls={openSubmenu ? 'composition-menu' : undefined}
        aria-expanded={openSubmenu ? 'true' : undefined}
        aria-haspopup="true"
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <span onMouseEnter={() => handleToggle()}>{text}</span>
        {subMenus && subMenus.length && (
          <div style={{ marginLeft: 8 }}>
            <Image
              src={openSubmenu ? ArrowUpIcon : ArrowDownIcon}
              width={13}
              height={17}
            />
          </div>
        )}
      </MenuItem>
      <MenuPopper
        open={openSubmenu}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'left top',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose('')}>
                <SubMenuItem
                  autoFocus={openSubmenu}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  {subMenus?.map((sm, _j) => (
                    <SubMenuItem
                      onClick={handleClose(sm.link)}
                      key={_j}
                      id="header-menu-item"
                    >
                      {sm.text}
                    </SubMenuItem>
                  ))}
                </SubMenuItem>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </MenuPopper>
    </Container>
  );
};
