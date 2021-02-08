import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

import { getRequestRepo } from 'src/requestRepo';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
export default function RequestForm({ visible, setVisible, env, id, initial }) {
	const classes = useStyles();

	// Setup repo
	const repo = getRequestRepo({ env, id });

	// Set initial state
	const [req, setReq] = useState(initial);

	// Presentation state
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	// Handlers
	function handleClose() {
		setVisible(false);
	}

	function handleMarker(e) {
		setReq({ ...req, location: { latitude: e.lat, longitude: e.lng } });
	}

	async function handleSubmit(e) {
		setLoading(true);

		try {
			await repo.createRequest(req);
			setSuccess(true);

			await new Promise((resolve) => setTimeout(resolve, 1000));
			setVisible(false);
		} catch (e) {}

		setLoading(false);
	}

	function handleAlert(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		setSuccess(false);
	}

	return (
		<Dialog open={visible} onClose={handleClose}>
			{loading && <LinearProgress />}
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
					disabled={loading}
					onChange={(event) => setReq({ ...req, businessName: event.target.value })}
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
					disabled={loading}
					onChange={(event) => setReq({ ...req, type: event.target.value })}
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
					disabled={loading}
					onChange={(event) => setReq({ ...req, description: event.target.value })}
				/>
				<InputLabel className={classes.label}>Address</InputLabel>
				<TextField
					variant="outlined"
					size="small"
					fullWidth
					multiline
					className={classes.textField}
					value={req.address}
					disabled={loading}
					onChange={(event) => setReq({ ...req, address: event.target.value })}
				/>
				<div className={classes.mapContainer}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP }}
						defaultCenter={{
							lat: initial.location.latitude,
							lng: initial.location.longitude
						}}
						defaultZoom={17}
						onClick={handleMarker}
					>
						<LocationOnIcon
							lat={req.location.latitude}
							lng={req.location.longitude}
							color="error"
						/>
					</GoogleMapReact>
				</div>
				<Button
					variant="contained"
					color="primary"
					size="medium"
					disableElevation
					fullWidth
					className={classes.submitButton}
					disabled={loading}
					onClick={handleSubmit}
				>
					Submit Request
				</Button>
			</DialogContent>
			<Snackbar open={success} autoHideDuration={1000} onClose={handleAlert}>
				<MuiAlert elevation={6} variant="filled" onClose={handleAlert} severity="success">
					Request have been created
				</MuiAlert>
			</Snackbar>
		</Dialog>
	);
}
