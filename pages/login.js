import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    height: `100vh`
  },
  loginRoot: {
    padding: `10vh 5% 10vh 5%`
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
        <Typography component="h1" variant="h3">
          Seatlect
        </Typography>
        <Typography component="h3" variant="h6" classes={{ root: classes.loginSubtitle }}>
          Please login to continue
        </Typography>
      </Grid>
    </Grid>
  );
}
