import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: `800px`,
    width:`100%`,
  },
	paper_padding: {
    padding: `10px`,
  },
  control: {
    padding: theme.spacing(2),
  },
	row:{
		display : `flex`,
		margin: `10px -20px 10px 0px`
	},
}));

export default function DayCard() {
	const classes = useStyles();
	const [id, setId] = useState('');
	const [value, onChange] = useState(new Date());
	const today = new Date();
	const [view_month,setView_Month] = useState(today.getMonth());
	const [view_year,setView_Year] = useState(today.getFullYear());
	useEffect(() => setId(localStorage.getItem('_id')), []);

	return (
		<div>
      <h3>Day</h3>
    </div>
	);
}