// App.tsx
import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Home from "@/scenes/Home";
import Accounts from "@/scenes/Accounts";
import LogTransaction from "@/scenes/logTransaction";
import { OoContractProvider } from "./connection/ooContractContext";
import { FsContractProvider } from "./connection/fsContractContext";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app">
      <BrowserRouter>
        <OoContractProvider>
        <FsContractProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/logTransaction" element={<LogTransaction />} />
                <Route path="/accounts" element={<Accounts />} />
              </Routes>
            </Box>
          </ThemeProvider>
        </FsContractProvider>
        </OoContractProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
