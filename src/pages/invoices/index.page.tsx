import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import { Box, Stack, Typography } from '@mui/material';
import fileDownload from 'js-file-download';

import {
  DataTableContainer,
  DropdownWrapper,
  DownloadAllButton,
} from './index.styles';
import { TableColumn, TInvoice, InvoiceTableData } from '../../interfaces';
import JobManageDataTable from '../../components/JobManageDataTable';
import { createInvoiceTableData } from '../../utils/helper';
import PDFIcon from '../../components/SVGIcons/PDFIcon';
import { AppDropdown } from '../../components/Dropdown';
import Header from '../../components/AppHeader/DashboardHeader';

const formatStatus = ({
  status,
  setStatus,
}: {
  status: string;
  setStatus: (value: string) => void;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      className="cursor__pointer"
      bgcolor="#B50000"
      borderRadius="3px"
      width="fit-content"
      p="4px 12px"
      onClick={() => setStatus('download')}
    >
      <Typography fontSize={14} fontWeight={400} lineHeight="21px" mr="10px">
        PDF
      </Typography>
      <PDFIcon />
    </Box>
  );
};

const InvoicesPage = () => {
  const { account, activate } = useWeb3React();
  const [invoices, setInvoices] = useState<TInvoice[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!account) return;
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/invoice/getInvoicesByCreator`, {
        params: {
          userId: account?.toLowerCase(),
          isSortByAsc: sortOrder === 'asc',
        },
      })
      .then(({ data }) => {
        if (data.success) {
          setInvoices(data.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [account, sortOrder]);

  const columns: TableColumn[] = useMemo(
    () => [
      { id: 'name', label: 'Jobs', minWidth: 100, align: 'left' },
      {
        id: 'price',
        label: 'Paid',
        minWidth: 100,
      },
      {
        id: 'date',
        label: 'Transaction Date',
        minWidth: 50,
      },
      {
        id: 'action',
        label: 'Status',
        minWidth: 50,
        format: formatStatus,
      },
    ],
    []
  );

  const rows: InvoiceTableData[] = useMemo(() => {
    return invoices.map((invoice, _i) => createInvoiceTableData(invoice, _i));
  }, [invoices]);

  const handleManageJob = (type: number, id: string) => {
    console.log(type, id);
  };

  const handleChangeAction = (id: string, val: any) => {
    const link = invoices.find((item) => item.id === id)?.link;
    if (!link) return;

    axios
      .get(link, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, `${id}.pdf`);
      });
  };

  const handleDownloadAllInvoices = async () => {
    const promises = invoices.map((invoice) =>
      axios
        .get(invoice.link, {
          responseType: 'blob',
        })
        .then((res) => {
          fileDownload(res.data, `${invoice.id}.pdf`);
        })
    );

    await Promise.all(promises);
  };

  return (
    <>
      <Header />
      <Stack width="100%" p="44px 0 0 47px" boxSizing="border-box">
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight={700} fontSize={22} lineHeight="26.4px">
            Invoice
          </Typography>
          <DropdownWrapper mr="8px">
            <DownloadAllButton onClick={handleDownloadAllInvoices}>
              Download all invoices
              <PDFIcon />
            </DownloadAllButton>
            <AppDropdown
              options={[
                { value: 'asc', text: 'Ascending' },
                { value: 'desc', text: 'Descending' },
              ]}
              value={sortOrder}
              onChange={setSortOrder}
            />
          </DropdownWrapper>
        </Box>

        <DataTableContainer mt={2} height="800px">
          <JobManageDataTable
            columns={columns}
            rows={rows}
            loading={loading}
            handleManageJob={handleManageJob}
            handleChangeAction={handleChangeAction}
          />
        </DataTableContainer>
      </Stack>
    </>
  );
};

export default InvoicesPage;
