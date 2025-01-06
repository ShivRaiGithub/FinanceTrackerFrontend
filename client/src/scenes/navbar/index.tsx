import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { useContract } from "@/connection/ooContractContext";
import { useContract as useFSContract } from "@/connection/fsContractContext";

type Props = {};

const Navbar = (props: Props) => {
  const { initialized, isOwner } = useContract();
  const { orgName } = useFSContract();
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Home
          </Link>
        </Box>

        {initialized && (
          <>
            {isOwner && (
              <>
              <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                <Link
                  to="/dashboard"
                  onClick={() => setSelected("dashboard")}
                  style={{
                    color: selected === "dashboard" ? "inherit" : palette.grey[700],
                    textDecoration: "inherit",
                  }}
                >
                  Dashboard
                </Link>
              </Box>
              <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                <Link
                  to="/accounts"
                  onClick={() => setSelected("accounts")}
                  style={{
                    color: selected === "accounts" ? "inherit" : palette.grey[700],
                    textDecoration: "inherit",
                  }}
                >
                  Accounts
                </Link>
              </Box>
              <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                <Link
                  to="/transactions"
                  onClick={() => setSelected("transactions")}
                  style={{
                    color: selected === "transactions" ? "inherit" : palette.grey[700],
                    textDecoration: "inherit",
                  }}
                >
                  Transactions
                </Link>
              </Box>
              </>
            )}

            <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
              <Link
                to="/logTransaction"
                onClick={() => setSelected("logTransaction")}
                style={{
                  color: selected === "logTransaction" ? "inherit" : palette.grey[700],
                  textDecoration: "inherit",
                }}
              >
                Log Transaction
              </Link>
            </Box>
          </>
        )}
      </FlexBetween>

      <Box sx={{ ml: "auto" }}>
        {orgName}
      </Box>
    </FlexBetween>
  );
};

export default Navbar;
