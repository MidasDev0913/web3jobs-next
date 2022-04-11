import * as React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TablePagination,
  TableRow,
  styled,
  Typography,
  Skeleton,
} from '@mui/material';
import { TableColumn } from '../../interfaces';

type DataTableProps = {
  columns: TableColumn[];
  rows: any[];
  loading?: boolean;
  handleChangeAction?: (id: string, val: any) => void;
  handlePage?: (arg: number) => void;
  onClickRow?: (arg: string) => void;
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

export default function DataTable({
  columns,
  rows,
  loading,
  handleChangeAction,
  handlePage,
  onClickRow,
}: DataTableProps) {
  const rowsPerPage = 20;
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    if (handlePage) {
      handlePage(newPage);
    }
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
                                : column.format && column.label === 'Action'
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
            height="50px"
            style={{
              backgroundColor: '#181824',
              zIndex: 1,
              marginTop: 16,
            }}
            key={_i}
          />
        ))}
      {rows.length <= 0 && !loading && (
        <Typography
          width="100%"
          mt={8}
          fontWeight={500}
          color="#A3A1A1"
          textAlign="center"
        >
          NO DATA AVAILABLE
        </Typography>
      )}
      {rows.length > 0 && (
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={20}
          page={page}
          onPageChange={handleChangePage}
        />
      )}
    </Container>
  );
}
