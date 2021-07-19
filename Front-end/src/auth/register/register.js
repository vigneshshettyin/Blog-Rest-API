import React, { useState } from "react";
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
import { SERVER_URL } from "../../ServerLink";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a
        color="inherit"
        rel="noreferrer"
        target="_blank"
        href="https://vigneshcodes.in/"
      >
        Vignesh Shetty
      </a>{" "}
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    phone: "",
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

  const classes = useStyles();

  const history = useHistory();

  const CheckForRegister = () => {
    if (AUTH()) {
      history.push("/dashboard");
    }
  };

  function registerUser(data) {
    axios
      .post(`${SERVER_URL}/api/user`, data)
      .then((response) => {
        if (response.status === 200) {
          swal({
            title: "Success!",
            text: "Registration Successful!",
            icon: "success",
            button: "Login!",
          }).then(() => {
            history.push("/login");
          });
        }
      })
      .catch((error) => {
        swal("Error!", error.response.data.error, "error");
      });
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password, firstName, phone } = data;
    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("userName", firstName);
    formdata.append("phone", phone);
    registerUser(formdata);
  };

  return (
    <Container component="main" maxWidth="xs">
      {CheckForRegister()}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onFormSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                value={data.firstName}
                onChange={OnChangeValue}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Phone"
                name="phone"
                value={data.phone}
                onChange={OnChangeValue}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={data.email}
                onChange={OnChangeValue}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={data.password}
                onChange={OnChangeValue}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {JSON.stringify(data)}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
