import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { FC, useContext } from "react";
import { useSignOut } from "react-auth-kit";
import { useLocation, useNavigate } from "react-router-dom";
import LogoBlack from "../assets/LogoBlack.png";
import LogoWhite from "../assets/LogoWhite.png";
import { ColorModeContext, tokens } from "../context/useMode";
import { useNotification } from "../hooks/useNotification";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import TimerIcon from '@mui/icons-material/Timer';

const Header: FC = () => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // hooks
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const signOut = useSignOut();
  const [notify] = useNotification();

  // handlers
  const navigationHandler = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={1}
      height="10vh"
      sx={{
        borderBottom: `1px solid ${colors.grey[800]}`,
      }}
    >
      <Box display="flex" p={1} gap={2}>
        {theme.palette.mode === "dark" ? (
          <img src={LogoWhite} alt="logo" />
        ) : (
          <img src={LogoBlack} alt="logo" />
        )}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          onClick={() => navigate("/flashcards")}
          sx={{
            cursor: "pointer",
            userSelect: "none",
            "&:hover": {
              borderBottom: `1px solid ${colors.greenAccent[500]}`,
            },
          }}
        >
          <Typography variant="h4" textAlign="center">
            Flashcards
          </Typography>
          <ViewCarouselOutlinedIcon />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          onClick={() => navigate("/pomodoro")}
          sx={{
            cursor: "pointer",
            userSelect: "none",
            "&:hover": {
              borderBottom: `1px solid ${colors.greenAccent[500]}`,
            },
          }}
        >
          <Typography variant="h4" textAlign="center">
            Pomodoro
          </Typography>
          <TimerIcon />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{
            width: "40px",
            height: "40px",
          }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {location.pathname === "/login" || location.pathname === "/register" ? (
          <IconButton
            onClick={() => navigationHandler("/login")}
            sx={{
              width: "40px",
              height: "40px",
            }}
          >
            <LoginIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              signOut();
              notify({ variant: "info", message: "You are logged out" });
            }}
            sx={{
              width: "40px",
              height: "40px",
            }}
          >
            <LogoutIcon />
          </IconButton>
        )}
        <IconButton
          onClick={() => {
            navigate("/profile");
          }}
          sx={{
            width: "40px",
            height: "40px",
          }}
        >
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
