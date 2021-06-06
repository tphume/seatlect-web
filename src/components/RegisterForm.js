import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

import { getUserRepo } from 'src/userRepo';

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
export default function RegisterForm({ visible, setVisible }) {
	const classes = useStyles();

	// Setup repo
	const repo = getUserRepo({ env: process.env.NEXT_PUBLIC_ENV, url: process.env.NEXT_PUBLIC_BE });

	// Set initial state
	const [req, setReq] = useState({
		email: '',
		username: '',
		password: '',
		businessName: '',
		type: 'Restaurant',
		description: '',
		address: '',
		location: {
			latitude: 13.7563,
			longitude: 100.5018
		}
	});

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
			await repo.register(req);
			setSuccess(true);

			await new Promise((resolve) => setTimeout(resolve, 2000));
			setVisible(false);
		} catch (e) { }

		setLoading(false);
	}

	function handleAlert(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		setSuccess(false);
	}

	return (
		<Dialog open={visible} onClose={handleClose} fullWidth>
			{loading && <LinearProgress />}
			<DialogTitle>Register</DialogTitle>
			<DialogContent>
				<DialogContentText>Fill in all the fields and click submit to proceed.</DialogContentText>
				<InputLabel className={classes.label}>Email</InputLabel>
				<TextField
					variant="outlined"
					size="small"
					fullWidth
					className={classes.textField}
					disabled={loading}
					value={req.email}
					onChange={(e) => setReq({ ...req, email: e.target.value })}
				/>
				<InputLabel className={classes.label}>Username</InputLabel>
				<TextField
					variant="outlined"
					size="small"
					fullWidth
					className={classes.textField}
					disabled={loading}
					value={req.username}
					onChange={(e) => setReq({ ...req, username: e.target.value })}
				/>
				<InputLabel className={classes.label}>Password</InputLabel>
				<TextField
					variant="outlined"
					size="small"
					type="password"
					fullWidth
					className={classes.textField}
					disabled={loading}
					value={req.password}
					onChange={(e) => setReq({ ...req, password: e.target.value })}
				/>
				<InputLabel className={classes.label}>Business Name</InputLabel>
				<TextField
					variant="outlined"
					size="small"
					fullWidth
					className={classes.textField}
					disabled={loading}
					value={req.businessName}
					onChange={(e) => setReq({ ...req, businessName: e.target.value })}
				/>
				<InputLabel className={classes.label}>Type</InputLabel>
				<Select
					labelId="type-select"
					id="type-select"
					variant="outlined"
					margin="dense"
					fullWidth
					className={classes.selectField}
					disabled={loading}
					value={req.type}
					onChange={(e) => setReq({ ...req, type: e.target.value })}
				>
					<MenuItem value="Restaurant">Restaurant</MenuItem>
					<MenuItem value="Bar">Bar</MenuItem>
				</Select>
				<InputLabel className={classes.label}>Description</InputLabel>
				<TextField
					variant="outlined"
					size="small"
					fullWidth
					multiline
					className={classes.textField}
					disabled={loading}
					value={req.description}
					onChange={(e) => setReq({ ...req, description: e.target.value })}
				/>
				<InputLabel className={classes.label}>Address</InputLabel>
				<TextField
					variant="outlined"
					size="small"
					fullWidth
					multiline
					className={classes.textField}
					disabled={loading}
					value={req.address}
					onChange={(e) => setReq({ ...req, address: e.target.value })}
				/>
				<div className={classes.mapContainer}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP }}
						defaultCenter={{
							lat: 13.7563,
							lng: 100.5018
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
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</DialogContent>
			<Snackbar open={success} autoHideDuration={2000} onClose={handleAlert}>
				<MuiAlert elevation={6} variant="filled" onClose={handleAlert} severity="success">
					Register successfully - check your email
				</MuiAlert>
			</Snackbar>
		</Dialog>
	);
}
