import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { getUserRepo } from 'src/userRepo';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    height: `100vh`
  },
  loginRoot: {
    padding: `10vh 12.5% 10vh 12.5%`
  },
  loginSubtitle: {
    color: `#BDBDBD`
  },
  loginButton: {
    marginTop: `1rem`,
    padding: `12px 22px`
  },
  createButton: {
    fontWeight: `700`
  }
});

export default function Login({ env }) {
  const classes = useStyles();
  const router = useRouter();

  const userRepo = getUserRepo(env);

  // Input state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await userRepo.login({ username, password });
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Grid container component="main" spacing={0} className={classes.root}>
      <Grid item component="div" sm={6}></Grid>
      <Grid item component="section" sm={6} className={classes.loginRoot}>
        <Box marginBottom={`2rem`}>
          <Typography component="h1" variant="h3">
            Seatlect
          </Typography>
          <Typography component="h3" variant="h6" classes={{ root: classes.loginSubtitle }}>
            Please login to continue
          </Typography>
        </Box>
        <form autoComplete="off">
          <TextField
            required
            variant="outlined"
            fullWidth
            margin="normal"
            label="Username"
            placeholder="Jiaroach"
            InputLabelProps={{ shrink: true }}
            value={username}
            onChange={(e) => setUsername(e.value)}
          />
          <TextField
            required
            variant="outlined"
            fullWidth
            margin="normal"
            label="Password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            InputLabelProps={{ shrink: true }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            fullWidth
            classes={{ root: classes.loginButton }}
            onClick={handleLogin}
          >
            Sign in
          </Button>
        </form>
        <p style={{ marginTop: `2rem` }}>
          Don't have an account yet?
          <Button size="small" color="secondary" classes={{ root: classes.createButton }}>
            Create account
          </Button>
        </p>
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(ctx) {
  // If already logged in - redirect to homepage
  if (ctx.req.cookies.token != undefined) {
    return { redirect: { destination: '/', permanent: false } };
  }

  return { props: { env: process.env.NODE_ENV } };
}
