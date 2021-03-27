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
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
];

// visible (and setVisible) should be a React state variable and it set state function
export default function RequestForm({ visible, setVisible, id, initial }) {
	const classes = useStyles();

	// Setup repo
	const repo = getRequestRepo({ env: process.env.NODE_ENV, id, url: process.env.NEXT_PUBLIC_BE });

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

	function handleMarkerCurrent(e) {
		if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
					setReq({ ...req, location: { latitude: position.coords.latitude, longitude: position.coords.longitude } });
        },
      );
    } 
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
				<Autocomplete
					id="combo-box-demo"
					options={top100Films}
					getOptionLabel={(option) => option.title}
					style={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
				/>
				<div className={classes.mapContainer}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP }}
						center={{
							lat: req.location.latitude,
							lng: req.location.longitude
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
				<Grid className={classes.row} container spacing={3}>
					<Grid item sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							disableElevation
							fullWidth
							onClick={handleMarkerCurrent}
						>
							Current location
						</Button>
					</Grid>
					<Grid item sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							disableElevation
							fullWidth
							onClick={handleSubmit}
						>
							Submit Request
						</Button>
					</Grid>
				</Grid>
				{/* <Button
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
				</Button> */}
			</DialogContent>
			<Snackbar open={success} autoHideDuration={1000} onClose={handleAlert}>
				<MuiAlert elevation={6} variant="filled" onClose={handleAlert} severity="success">
					Request have been created
				</MuiAlert>
			</Snackbar>
		</Dialog>
	);
}
