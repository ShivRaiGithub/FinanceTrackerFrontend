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
import LogTransaction from "@/scenes/logTransaction";
import CreateContract from "@/scenes/createContract";
import MakeTransaction from "@/scenes/makeTransaction";
import { ContractProvider } from "./connection/contractContext";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app">
      <BrowserRouter>
        <ContractProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/createContract" element={<CreateContract />} />
                <Route path="/logTransaction" element={<LogTransaction />} />
                {/* <Route path="/makeTransaction" element={<MakeTransaction />} /> */}
              </Routes>
            </Box>
          </ThemeProvider>
        </ContractProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
