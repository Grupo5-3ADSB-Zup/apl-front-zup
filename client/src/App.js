import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Index from "components/home/homeInstitucional";
import AdminWidget from "scenes/widgets/AdminWidget";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.user));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/admin" element={<AdminWidget/>} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Index/> }
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Index/>}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
