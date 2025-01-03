import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
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
        {/* <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/makeTransaction"
            onClick={() => setSelected("makeTransaction")}
            style={{
              color: selected === "makeTransaction" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
            >
            Make Payment
          </Link>
            </Box> */}
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
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
