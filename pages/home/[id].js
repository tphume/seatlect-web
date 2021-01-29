import React, { useState, useEffect } from 'react';

import Layout from 'src/components/layout';
import { getBusinessRepo } from 'src/businessRepo';

import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  form: {
    width: `500px`
  }
});

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
      <div>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            size="small"
            disabled={true}
            value={business.businessName}
            fullWidth={true}
            label="Business Name"
          />
        </form>
      </div>
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
