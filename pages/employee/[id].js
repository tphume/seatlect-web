	import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from '@material-ui/core/Modal';


import EmployeeCard from './employeeCard';
import CreateEmployee from './createEmployee';
import EditEmployee from './editEmployee';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		height: `500px`,
		width: `100%`
	},
	control: {
		padding: theme.spacing(2)
	},
  createButton:{
    display: `flex`,
    justifyContent: `flex-end`
  }
}));

export default function Employee() {
	// Initial setup
	const classes = useStyles();

	// Id state is the id of the business
	const [id, setId] = useState('');
	// const [data, setData] = useState(menu);
	
	
	const [openCreate, setOpenCreate] = React.useState(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	
	// employee username + password
	const [selectedEmployee, setEmployeeInfo] = React.useState('');
	const handleOpenCreate = () => {
		setOpenCreate(true);
	};

	// Handle open close modal
	const handleCloseCreate = () => {
		setOpenCreate(false);
	};
	const handleOpenEdit = (info) => {
		setOpenEdit(true);
		setEmployeeInfo(info);
	};
	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	
	// Set if request form should be visible
	const [requestForm, setRequestForm] = useState(false);

	// load initial id from local storage
	useEffect(function () {
		setId(localStorage.getItem('_id'));
	}, []);

	const body = (
		<div className={classes.paper}>
			<h2 id="simple-modal-title">Create new employee</h2>
			<p id="simple-modal-description">test</p>
		</div>
	);

	return (
		<Layout id={id}>
			<Grid container className={classes.root} spacing={2}>
				
        {/* --- Create button ---*/}
				<Grid item xs={12} className={classes.createButton}>
					<Button color="primary" variant="contained" onClick={() => handleOpenCreate()}>
						Create
					</Button>
				</Grid>
				
        {/*   ----- Modal create section -----   */}
				<Modal
					open={openCreate}
					onClose={handleCloseCreate}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<CreateEmployee
						className={classes.modal}
						// ------------------------------------------------------------------------origjvnoetpowqi
						onClickClose={() => {
							handleCloseCreate();
						}}
					/>
				</Modal>
				
				
			</Grid>
		</Layout>
	);
}
