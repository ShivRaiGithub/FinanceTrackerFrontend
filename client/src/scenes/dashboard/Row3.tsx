import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { GetTransactionsResponse, Account } from '@/state/types';

interface Props {
  trackedAccounts: Account[];
  updatedTransactionsList: GetTransactionsResponse[];
}

const Row3: React.FC<Props> = ({ trackedAccounts, updatedTransactionsList }) => {

  const { palette } = useTheme();
  const trackedAccountsColumn = [
    {
      field: "id",
      headerName: "Account",
      flex: 0.5,
    },
  ];
  
  const transactionColumns = [
    {
      field: "sender",
      headerName: "Sender",
      flex: 0.67,
      // renderCell: (params: GridCellParams) => `${params.row.sender}`
    },
    {
      field: "recipient",
      headerName: "Receiver",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `${params.value}`,

    },
    {
      field: "description",
      headerName: "Description",
      flex: 0.67,
    },
  ];


  return (
    <>
    <DashboardBox gridArea="h">
      <BoxHeader title="List of Accounts" sideText="" />
      <Box
        mt="0.5rem"
        p="0 0.5rem"
        height="75%"
        sx={{
          "& .MuiDataGrid-root": {
            color: palette.primary[300],
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: `1px solid ${palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-columnSeparator": {
            visibility: "hidden",
          },
        }}
      >
        <DataGrid
          columnHeaderHeight={25}
          rowHeight={35}
          hideFooter={true}
          rows={trackedAccounts || []}
          columns={trackedAccountsColumn}
          getRowId={(row) => row.id}
        />
      </Box>
    </DashboardBox>



<DashboardBox gridArea="g" >
<BoxHeader
  title="Recent Transactions"
  sideText=""
/>
<Box
  mt="1rem"
  p="0 0.5rem"
  height="80%"
  sx={{
    "& .MuiDataGrid-root": {
      color: palette.primary[300],
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: `1px solid ${palette.grey[800]} !important`,
    },
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: `1px solid ${palette.grey[800]} !important`,
    },
    "& .MuiDataGrid-columnSeparator": {
      visibility: "hidden",
    },
  }}
>
  <DataGrid
    columnHeaderHeight={25}
    rowHeight={35}
    hideFooter={true}
    rows={(updatedTransactionsList || []).slice().reverse()} // Reverse the array
    columns={transactionColumns}
    getRowId={(row) => row.timestamp} // Fallback to other properties
  />
</Box>
</DashboardBox>
</>
  );
};

export default Row3;
