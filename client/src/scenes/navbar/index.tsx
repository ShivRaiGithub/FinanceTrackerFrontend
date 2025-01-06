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
  const [selected, setSelected] = useState("/");

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[100]}>
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("/")}
            style={{
              color: selected === "/" ? palette.grey[100] : palette.grey[400],
              textDecoration: "inherit",
            }}
          >
              <Box
              sx={{
                "&:hover": { color: palette.secondary[100] },
                transition: "color 0.2s ease-in-out",
              }}
            >
            Home
        </Box>
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
                    color: selected === "dashboard" ? palette.grey[100] : palette.grey[400],
                    textDecoration: "inherit",
                  }}
                >
                    <Box
                    sx={{
                      "&:hover": { color: palette.secondary[100] },
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                  Dashboard
              </Box>
                </Link>
              </Box>
              <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                <Link
                  to="/accounts"
                  onClick={() => setSelected("accounts")}
                  style={{
                    color: selected === "accounts" ? palette.grey[100] : palette.grey[400],
                    textDecoration: "inherit",
                  }}
                >
                    <Box
                    sx={{
                      "&:hover": { color: palette.secondary[100] },
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                  Accounts
              </Box>
                </Link>
              </Box>
              <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                <Link
                  to="/transactions"
                  onClick={() => setSelected("transactions")}
                  style={{
                    color: selected === "transactions" ? palette.grey[100] : palette.grey[400],
                    textDecoration: "inherit",
                  }}
                >
                    <Box
                    sx={{
                      "&:hover": { color: palette.secondary[100] },
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                  Transactions
              </Box>
                </Link>
              </Box>
              </>
            )}

            <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
              <Link
                to="/logTransaction"
                onClick={() => setSelected("logTransaction")}
                style={{
                  color: selected === "logTransaction" ? palette.grey[100] : palette.grey[400],
                  textDecoration: "inherit",
                }}
              >
                  <Box
                  sx={{
                    "&:hover": { color: palette.secondary[100] },
                    transition: "color 0.2s ease-in-out",
                  }}
                >
                Log Transaction
            </Box>
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
