import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import auth from "../api/services/auth";
import user from "../api/services/user";
import { Container } from "../assets/styles/common";
import { useNotification } from "../hooks/useNotification";
import { tokens } from "../context/useMode";

const LoginPage: FC = () => {
  // hooks
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [notify] = useNotification();
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // states
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // handlers
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (values: { email: string; password: string }) => {
    setError("");

    try {
      const response = await auth.login(values);

      const userInfo = await user.userInfo(values.email);

      signIn({
        token: response.data.accessToken,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email, ...userInfo.data },
      });

      navigate("/flashcards");
      notify({ variant: "success", message: "Successfully logged in" });
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);
      notify({
        variant: "error",
        message: "Incorrect email or password, try again!",
      });
    }
  };

  // formik and yup
  const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup
      .string()
      .required("required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: checkoutSchema,
  });

  return (
    <Container>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="30px"
        padding="20px 10px"
        width="600px"
        margin={0}
      >
        <Typography variant="h2" color="secondary">
          Sign in to the account
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          name="email"
          label="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          margin="dense"
          autoComplete="off"
          sx={{
            height: "60px",
          }}
        />
        <TextField
          fullWidth
          variant="filled"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            height: "60px",
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            ),
          }}
        />

        <Button
          fullWidth
          disableElevation
          disableRipple
          color="secondary"
          variant="contained"
          disabled={formik.isSubmitting}
          onClick={() => onSubmit(formik.values)}
          sx={{ fontWeight: 700, fontSize: "16px" }}
        >
          Login
        </Button>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography variant="h6" paddingRight={2}>
            Do not have an account?
          </Typography>
          <Link
            underline="hover"
            color="secondary"
            variant="h6"
            onClick={() => navigate("/register")}
          >
            Register now!
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
