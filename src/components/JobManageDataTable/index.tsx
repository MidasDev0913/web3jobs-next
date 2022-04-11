import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Box,
  Popover,
  IconButton,
  TableHead,
  styled,
  Typography,
  Skeleton,
} from '@mui/material';

import { TableColumn } from '../../interfaces';
import MenuIcon from '../SVGIcons/MenuIcon';
import DeleteIcon from '../SVGIcons/DeleteIcon';
import DetailIcon from '../SVGIcons/DetailIcon';
import EditIcon from '../SVGIcons/EditIcon';
import { MenuWrapper } from './index.styles';

type DataTableProps = {
  columns: TableColumn[];
  rows: any[];
  loading?: boolean;
  handleChangeAction?: (id: string, val: any) => void;
  handlePage?: (arg: number) => void;
  onClickRow?: (arg: string) => void;
  handleManageJob: (arg: number, id: string) => void;
};

const Container = styled(Paper)`
  box-shadow: none;
  & .MuiTablePagination-selectLabel {
    visibility: hidden;
  }
  & .MuiInputBase-root {
    visibility: hidden;
  }
`;

export default function JobManageDataTable({
  columns,
  rows,
  loading,
  handleChangeAction,
  handlePage,
  onClickRow,
  handleManageJob,
}: DataTableProps) {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 20;
  const [selId, setSelId] = React.useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    if (handlePage) {
      handlePage(newPage);
    }
  };

  const handleClickMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    rowId: string
  ) => {
    setSelId(rowId);
    setAnchorEl(event.currentTarget);
  };

  return (
    <Container sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns
                .filter((col) => col.visible !== false)
                .map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          {rows.length > 0 && !loading && (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, _i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={_i}>
                      {columns
                        .filter((col) => col.visible !== false)
                        .map((column, _j) => {
                          if (column.id === 'menu') {
                            return (
                              <TableCell
                                align={column.align}
                                style={{
                                  cursor: column.clickable ? 'pointer' : 'auto',
                                }}
                              >
                                <IconButton
                                  onClick={(e) => handleClickMenu(e, row.id)}
                                >
                                  <MenuIcon />
                                </IconButton>
                                <Popover
                                  id={row.id}
                                  open={Boolean(anchorEl)}
                                  anchorEl={anchorEl}
                                  onClose={() => setAnchorEl(null)}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  sx={{ boxShadow: 'none' }}
                                >
                                  <MenuWrapper direction="column">
                                    <Box
                                      className="menu-item"
                                      onClick={() => {
                                        handleManageJob(0, selId);
                                        setAnchorEl(null);
                                      }}
                                    >
                                      <DetailIcon /> Detail
                                    </Box>
                                    <Box
                                      className="menu-item"
                                      onClick={() => {
                                        handleManageJob(1, selId);
                                        setAnchorEl(null);
                                      }}
                                    >
                                      <DeleteIcon /> Delete
                                    </Box>
                                    {row.action !== 'pending' && (
                                      <Box
                                        className="menu-item"
                                        onClick={() => {
                                          handleManageJob(2, selId);
                                          setAnchorEl(null);
                                        }}
                                      >
                                        <EditIcon /> Edit
                                      </Box>
                                    )}
                                  </MenuWrapper>
                                </Popover>
                              </TableCell>
                            );
                          }
                          // @ts-ignore
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={_j}
                              align={column.align}
                              style={{
                                cursor: column.clickable ? 'pointer' : 'auto',
                              }}
                              onClick={() =>
                                column.clickable &&
                                onClickRow &&
                                onClickRow(row.id)
                              }
                            >
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : column.format && column.id === 'action'
                                ? column.format({
                                    status: value,
                                    setStatus: (a: any) =>
                                      handleChangeAction &&
                                      handleChangeAction(row.id, a),
                                  })
                                : typeof value === 'function'
                                ? value()
                                : value}
                            </TableCell>
                          );
                        })}
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {loading &&
        new Array(4).fill(0).map((item, _i) => (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="81px"
            style={{
              backgroundColor: '#181824',
              zIndex: 1,
              marginTop: 5,
            }}
            key={_i}
          />
        ))}
      {rows.length <= 0 && !loading && (
        <Typography
          width="100%"
          mt="22px"
          fontWeight={500}
          color="#A3A1A1"
          textAlign="center"
        >
          NO DATA AVAILABLE
        </Typography>
      )}
      {rows.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      )}
    </Container>
  );
}
