import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    height: `100vh`
  },
  loginRoot: {
    padding: `10vh 10% 10vh 10%`
  },
  loginSubtitle: {
    color: `#BDBDBD`
  }
});

export default function Login() {
  const classes = useStyles();

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
          />
        </form>
      </Grid>
    </Grid>
  );
}
