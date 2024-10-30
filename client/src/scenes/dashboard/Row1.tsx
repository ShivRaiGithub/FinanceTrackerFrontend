import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useMemo } from "react";
import FlexBetween from "@/components/FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";


import {
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from "recharts";

import { GetTransactionsResponse, TransactionData, TransactionsPerMonth, AmountPerMonth, Account, SentReceived } from '@/state/types';

interface Props {
  totalAmountOfTransactions: TransactionsPerMonth[];
  totalAmountPerMonth: AmountPerMonth[];
  receivedVsSent: SentReceived;
}

const Row1: React.FC<Props> = ({
  totalAmountOfTransactions,
  totalAmountPerMonth,
  receivedVsSent
}) => {
 
  const { palette } = useTheme();
  const amtOfTxnMade = useMemo(() => {
    return (
      totalAmountOfTransactions && 
      totalAmountOfTransactions.map(({ Month, amtOfTxn, received, sent }) => { 
        return {
          name: Month.substring(0, 3), 
          TotalTransactions: amtOfTxn,
          Received: received,
          Sent: sent,
        };
      })
    );
  }, [totalAmountOfTransactions]); 

  const pieData = [
    { name: "Received", value: receivedVsSent.received },
    { name: "Sent", value: receivedVsSent.sent },
  ];
  const pieColors = [palette.primary[800], palette.tertiary[500]];

  
  const amtInTxns = useMemo(() => {
    return (
      totalAmountPerMonth && 
      totalAmountPerMonth.map(({ Month, amt }) => { 
        return {
          name: Month.substring(0, 3),
          AmountTransacted: amt, 
        };
      })
    );
  }, [totalAmountPerMonth]); 

  return (
    <>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Amount of Transactions"
          subtitle="Total amount of transactions in last 12 months"
          sideText=""
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={amtOfTxnMade}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="TotalTransactions"
              stroke={palette.tertiary[500]}
            />
              <Line
              yAxisId="left"
              type="monotone"
              dataKey="Received"
              stroke={palette.background[500]}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Sent"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      


      <DashboardBox gridArea="c">
        <BoxHeader title="Amount Received vs Sent" sideText="" />
        <FlexBetween mt="3rem" gap="1.5rem" pr="1rem">
            <PieChart
            width={200}
            height={200}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
          <Typography m="2rem 0" variant="h3" color={palette.primary[300]}>
              Received
            </Typography>
          <Typography m="2rem 0" variant="h3" color={palette.tertiary[500]}>
              Sent
            </Typography>
          </Box>
        </FlexBetween>

            <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Received Amount</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              {pieData[0].value}
            </Typography>
            <Typography variant="h5">Sent Amount</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.tertiary[500]}>
              {pieData[1].value}
            </Typography>
          </Box>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Percentage Received</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              {((pieData[0].value / (pieData[0].value + pieData[1].value)) * 100).toFixed(2)}%
            </Typography>
            <Typography variant="h5">Percentage Sent</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.tertiary[500]}>
              {((pieData[1].value / (pieData[0].value + pieData[1].value)) * 100).toFixed(2)}%
            </Typography>
          </Box>
      </FlexBetween>
      </DashboardBox>



      <DashboardBox gridArea="e">
        <BoxHeader
          title="Money transacted each month"
          subtitle="Graph representing the Amount of money in Transactions per month"
          sideText=""
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={amtInTxns}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="AmountTransacted" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>


    </>
  );
};

export default Row1;



