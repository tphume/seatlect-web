import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    height: '100vh'
  }
});

export default function Login() {
  const classes = useStyles();

  return (
    <Grid container component="main" spacing={0} className={classes.root}>
      <Grid item component="div" sm={6}></Grid>
      <Grid item component="section" sm={6}></Grid>
    </Grid>
  );
}
