import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { RequireAuth } from "react-auth-kit";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./context/useMode";
import Header from "./layouts/Header";
import ErrorPage from "./pages/ErrorPage";
import FlashcardPage from "./pages/FlashcardPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import LoginPage from "./pages/LoginPage";
import PomodoroPage from "./pages/PomodoroPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import { TimerProvider } from "./context/useTimer";

function App() {
  const [theme, colorMode] = useMode();
  const queryClient = new QueryClient();

  return (
    <TimerProvider>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app">
                <main className="content">
                  <Header />
                  <Routes>
                    <Route
                      path="/pomodoro"
                      element={
                        <RequireAuth loginPath="/login">
                          <PomodoroPage />
                        </RequireAuth>
                      }
                      errorElement={<ErrorPage />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route
                      path="/profile"
                      element={
                        <RequireAuth loginPath="/login">
                          <ProfilePage />
                        </RequireAuth>
                      }
                      errorElement={<ErrorPage />}
                    />
                    <Route
                      path="/flashcards"
                      element={
                        <RequireAuth loginPath="/login">
                          <FlashcardsPage />
                        </RequireAuth>
                      }
                      errorElement={<ErrorPage />}
                    />

                    <Route
                      path="/flashcards/:id"
                      element={
                        <RequireAuth loginPath="/login">
                          <FlashcardPage />
                        </RequireAuth>
                      }
                      errorElement={<ErrorPage />}
                    />
                  </Routes>
                </main>
              </div>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </SnackbarProvider>
      </QueryClientProvider>
    </TimerProvider>
  );
}

export default App;
