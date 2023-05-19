import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Container,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { User } from "../api/interfaces";
import { tokens } from "../context/useMode";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileSettings from "../components/Profile/ProfileSettings";
import SchoolIcon from '@mui/icons-material/School';
const ProfilePage = () => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // hooks
  const navigate = useNavigate();
  const auth = useAuthUser();

  // state
  const [user, setUser] = useState<User>();
  const [tab, setTab] = useState<"info" | "topics">("info");

  // first render
  useEffect(() => {
    const userData = auth();

    if (userData) {
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        language: userData.language,
        level: userData.currentLevel,
        createdAt: userData.createdAt,
        learnedTopics: userData.learnedTopics,
      });
    }
    console.log(user);
  }, []);

  // handlers
  const handleTabChange = (tab: "info" | "topics") => {
    setTab(tab);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90%",
        p: "20px",
        gap: 4,
      }}
    >
      <Typography variant="h1">Account Settings</Typography>
      <Paper
        sx={{
          width: "100%",
          height: "80%",
          borderColor: colors.primary[400],
          cursor: "pointer",
          userSelect: "none",
          borderRadius: 5,
          border: 1,
          background: "none",
          display: "flex",
        }}
      >
        <Box
          display="flex"
          width="40%"
          height="100%"
          alignItems="center"
          flexDirection="column"
          p={2}
          sx={{
            borderColor: colors.primary[400],
            borderRight: 1,
          }}
        >
          <MenuList
            sx={{
              width: "100%",
            }}
          >
            <MenuItem
              onClick={() => handleTabChange("info")}
              sx={{
                width: "100%",
                height: "80px",
                border: `1px solid ${colors.greenAccent[400]}`,
                borderRadius: 5,
                my: 1,
                display: "flex",
                px: 5,
              }}
            >
              <ListItemIcon color="secondary">
                <InfoIcon />
              </ListItemIcon>
              <Typography variant="h3">Personal information</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => handleTabChange("topics")}
              sx={{
                width: "100%",
                height: "80px",
                border: `1px solid ${colors.greenAccent[400]}`,
                borderRadius: 5,
                my: 1,
                display: "flex",
                px: 5,
              }}
            >
              <ListItemIcon color="secondary">
                <SchoolIcon />
              </ListItemIcon>
              <Typography variant="h3">Learned Topics</Typography>
            </MenuItem>
          </MenuList>
        </Box>
  
        <Box
          display="flex"
          width="60%"
          sx={{
            justifyContent: "start",
            alignItems: "center",
            flexDirection: "column",
          }}
          py={5}
          px={15}
          gap={1}
        >
          {tab === "info" ? (
            <ProfileInfo user={user} />
          ) : (
            <ProfileSettings user={user} />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
