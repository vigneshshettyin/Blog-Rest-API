import React from "react";
import axios from "axios";
import swal from "sweetalert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AUTH } from "../../token/auth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const OnChangeValue = (e) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const history = useHistory();

  const CheckForLogin = () => {
    if (AUTH()) {
      history.push("/dashboard");
    }
  };

  function loginNow(data) {
    axios
      .post("http://localhost:5000/api/user/login", data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          swal({
            title: "Success!",
            text: "Login Successful!",
            icon: "success",
            button: "Dashboard!",
          }).then(() => {
            history.push("/dashboard");
          });
        }
      })
      .catch((error) => {
        swal("Error!", error.response.data.error, "error");
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = data;
    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    loginNow(formdata);
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      {CheckForLogin()}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={OnChangeValue}
            fullWidth
            id="email"
            value={data.email}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={OnChangeValue}
            value={data.password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        {JSON.stringify(data)}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
