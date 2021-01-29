import React, { useState, useEffect } from 'react';

import Layout from 'src/components/layout';
import { getBusinessRepo } from 'src/businessRepo';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  form: {
    width: `100%`
  },
  label: {
    color: `rgba(0, 0, 0, 0.87)`,
    fontWeight: `700`,
    fontSize: `0.75rem`,
    margin: '0 0 3px 0'
  },
  textField: {
    margin: `0 0 1.2rem 0`
  },
  selectField: {
    '&.MuiSelect-root, &.Mui-disabled': {
      margin: `0 0 1.2rem 0`
    }
  }
}));

export default function Home({ env, url, initial }) {
  const classes = useStyles();

  const [id, setId] = useState('');
  const [business, setBusiness] = useState(initial);

  useEffect(function () {
    setId(localStorage.getItem('_id'));
  }, []);

  if (Object.keys(initial).length === 0 && initial.constructor === Object) {
    return (
      <Layout id={id}>
        <div>
          <h1>An error occurred - try refreshing</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout id={id}>
      <Grid container spacing={1}>
        <Grid item component="div" sm={6}>
          <form className={classes.form}>
            <InputLabel className={classes.label}>Business Name</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              disabled
              value={business.businessName}
              fullWidth
              className={classes.textField}
            />
            <InputLabel className={classes.label}>Type</InputLabel>
            <Select
              labelId="type-select"
              id="type-select"
              variant="outlined"
              margin="dense"
              value={business.type}
              disabled
              fullWidth
              className={classes.selectField}
            >
              <MenuItem value="Restaurant">Restaurant</MenuItem>
              <MenuItem value="Bar">Bar</MenuItem>
              <MenuItem value="Theatre">Theatre</MenuItem>
            </Select>
            <InputLabel className={classes.label}>Description</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              disabled
              value={business.description}
              fullWidth
              multiline
              className={classes.textField}
            />
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  // If already logged in - redirect to homepage
  if (ctx.req.cookies.token == undefined) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  // Get params
  let env = process.env.NODE_ENV;
  let id = ctx.params.id;
  let initial = {};

  // Get initial data
  let businessRepo = getBusinessRepo({ env, id });
  try {
    initial = await businessRepo.getBusiness();
  } catch (e) {
    // TODO handle error
  }

  return {
    props: {
      env,
      url: process.env.URL ? process.env.URL : '',
      initial
    }
  };
}
