import React, { useState, useEffect, useCallback } from 'react';
import GoogleMapReact from 'google-map-react';

import Layout from 'src/components/layout';
import RequestFrom from 'src/components/RequestForm';
import { getBusinessRepo } from 'src/businessRepo';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useLoadScript} from "@react-google-maps/api"; 
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "@reach/combobox/styles.css";

import Paper from '@material-ui/core/Paper';
import { Search, SettingsInputAntennaTwoTone } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
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
	},
	mapContainer: {
		width: `100%`,
		height: `300px`,
		margin: `0 0 1.2rem 0`
	},
	displayCard: {
		display: `flex`,
		margin: `0.8rem auto 1.2rem auto`
	},
	displayImage: {
		width: 300
	},
	button: {
		margin: `0 0.5rem 1.2rem 0.5rem`
	},
	paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
	row: {
		display: `flex`,
		justifyContent: `space-between`,
	},
	search: {
		margin: `0 0 1.2rem 0`,	
	}
}));

export default function Home({ business }){
	// Initial setup
	const classes = useStyles();

	// Id state is the id of the business
	const [id, setId] = useState('');

	// Set if request form should be visible
	const [requestForm, setRequestForm] = useState(false);
	
	// Set lat + long coordinate
	const [req, setReq] = useState({
		businessName: business.businessName,
		type: business.type,
		description: business.description,
		address: business.address,
		location: {
			latitude: business.location.latitude,
			longitude: business.location.longitude
		}
	});

	// load initial id from local storage
	useEffect(function () {
		setId(localStorage.getItem('_id'));
	}, []);

	const libraries = ["places"];
	const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBhQpLSffxq08YO7XHdJV6ceZZ8K7CZx18',
    libraries,
  });

	const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

	// Check that data is loaded correctly
	if (Object.keys(business).length === 0 && business.constructor === Object) {
		return (
			<Layout id={id}>
				<div>
					<h1>An error occurred - try refreshing</h1>
				</div>
			</Layout>
		);
	}

	// timeout function
	function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
	}
	//Handle
	function handleMarker(e) {
		setReq({ ...req, location: { latitude: e.lat, longitude: e.lng } });
		console.log(req.location.latitude)
		console.log(req.location.longitude)
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
					console.log(position.coords.latitude)
					console.log(position.coords.longitude)
					console.log(req.location.latitude)
					console.log(req.location.longitude)
					// setReq({ ...req, location: { latitude: position.coords.latitude, longitude: position.coords.longitude } });
					
        },
      );
    } 
	}
	
	// TODO: displayImage modal and handlers
	// TODO: images modal and handlers

	if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

	return (
		<Layout id={id}>
			<RequestFrom
				visible={requestForm}
				setVisible={setRequestForm}
				id={id}
				initial={{
					businessName: business.businessName,
					type: business.type,
					tags: business.tags,
					description: business.description,
					location: business.location,
					address: business.address
				}}
			/>
			<Grid container spacing={1}>
				<Grid item component="div" sm={6}>
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
					<InputLabel className={classes.label}>Address</InputLabel>
					<TextField
						variant="outlined"
						size="small"
						disabled
						value={business.address}
						fullWidth
						multiline
						className={classes.textField}
					/>
					<SearchBar panTo={panTo}/>
					{/* --- GoogleMapReact --- */}
					<div className={classes.mapContainer}>
						<GoogleMapReact
							bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP }}
							center={{
								// lat: business.location.latitude,
								// lng: business.location.longitude
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
								onClick={() => setRequestForm(true)}
							>
								Request change
							</Button>
						</Grid>
					</Grid>
					{/* <Tooltip title="Make a request to change business information">
						<Button
							variant="contained"
							color="primary"
							size="large"
							disableElevation
							fullWidth
							onClick={() => setRequestForm(true)}
						>
							Request change
						</Button>
					</Tooltip> */}
				</Grid>
				<Grid item component="div" sm={6}>
					<Card className={classes.displayCard} variant="outlined">
						<CardMedia
							className={classes.displayImage}
							image={business.displayImage}
							component="img"
							height="180"
						/>
						<div>
							<CardContent>
								<Typography gutterBottom variant="h6" component="h2">
									Display Image
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									The avatar of the Business. The first image that the mobile application user will
									see.
								</Typography>
							</CardContent>
							<CardActionArea />
							<CardActions>
								<Tooltip title="Replace the display image">
									<Button size="small" color="primary">
										Edit
									</Button>
								</Tooltip>
							</CardActions>
						</div>
					</Card>
					{/* TODO: Add business.images slideshow card */}
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
	let business = {};

	// Get initial data
	let businessRepo = getBusinessRepo({ env, id, url: process.env.NEXT_PUBLIC_BE });
	try {
		business = await businessRepo.getBusiness();
	} catch (e) {
		// TODO handle error
	}

	return {
		props: {
			business
		}
	};
}

function SearchBar({panTo}) {
	const classes = useStyles();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 13.729896, lng: () => 100.779320 },
      radius: 200 * 1000
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
			console.log(panTo)
			panTo({ lat, lng });
			// setReq({ ...req, location: { latitude: lat, longitude: lng } });
			
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className={classes.search}>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}