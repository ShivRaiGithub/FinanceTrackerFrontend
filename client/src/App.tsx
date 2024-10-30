import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Home from "@/scenes/Home";
import LogTransaction from "@/scenes/logTransaction";
import { initializeContract } from "./connection/contractInstance";
function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  useEffect(() => {
    initializeContract();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/logTransaction" element={<LogTransaction />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
