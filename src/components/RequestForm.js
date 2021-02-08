import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	label: {
		color: `rgba(0, 0, 0, 0.87)`,
		fontWeight: `700`,
		fontSize: `0.75rem`,
		margin: '0 0 3px 0'
	},
	textField: {
		margin: `0 0 1rem 0`
	},
	selectField: {
		margin: `0 0 1rem 0`
	},
	mapContainer: {
		width: `100%`,
		height: `250px`,
		margin: `0 0 1.2rem 0`
	},
	submitButton: {
		margin: `0 0 1rem 0`
	}
}));

// visible (and setVisible) should be a React state variable and it set state function
export default function RequestForm({ visible, setVisible, initial }) {
	const classes = useStyles();

	// Set initial state
	const [req, setReq] = useState(initial);

	function handleClose() {
		setVisible(false);
	}

	return (
		<Dialog open={visible} onClose={handleClose}>
			<DialogTitle>Request Change</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To change Business information a request have to be made. Fill in the form with the new
					information and press Submit Request to make the request.
				</DialogContentText>
				<InputLabel className={classes.label}>Business Name</InputLabel>
				<TextField
					variant="outlined"
					size="small"
					fullWidth
					className={classes.textField}
					value={req.businessName}
				/>
				<InputLabel className={classes.label}>Type</InputLabel>
				<Select
					labelId="type-select"
					id="type-select"
					variant="outlined"
					margin="dense"
					fullWidth
					className={classes.selectField}
					value={req.type}
				>
					<MenuItem value="Restaurant">Restaurant</MenuItem>
					<MenuItem value="Bar">Bar</MenuItem>
					<MenuItem value="Theatre">Theatre</MenuItem>
				</Select>
				<InputLabel className={classes.label}>Description</InputLabel>
				<TextField
					variant="outlined"
					size="small"
					fullWidth
					multiline
					className={classes.textField}
					value={req.description}
				/>
				<InputLabel className={classes.label}>Address</InputLabel>
				<TextField
					variant="outlined"
					size="small"
					fullWidth
					multiline
					className={classes.textField}
					value={req.address}
				/>
				<div className={classes.mapContainer}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP }}
						defaultCenter={{
							lat: 0,
							lng: 0
						}}
						defaultZoom={17}
					></GoogleMapReact>
				</div>
				<Button
					variant="contained"
					color="primary"
					size="medium"
					disableElevation
					fullWidth
					className={classes.submitButton}
				>
					Submit Request
				</Button>
			</DialogContent>
		</Dialog>
	);
}
