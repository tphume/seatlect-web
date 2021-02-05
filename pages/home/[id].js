import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

import Layout from 'src/components/layout';
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
import Tooltip from '@material-ui/core/Tooltip';

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
		margin: `0 auto 1.2rem auto`,
	},
	displayImage: {
		width: 300
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

	// TODO: requestChange modal and handlers
	// TODO: displayImage modal and handlers
	// TODO: images modal and handlers

	return (
		<Layout id={id}>
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
					<div className={classes.mapContainer}>
						<GoogleMapReact
							bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP }}
							defaultCenter={{
								lat: business.location.latitude,
								lng: business.location.longitude
							}}
							defaultZoom={17}
						></GoogleMapReact>
					</div>
					<Tooltip title="Make a request to change business information">
						<Button variant="contained" color="primary" size="large" disableElevation fullWidth>
							Request change
						</Button>
					</Tooltip>
				</Grid>
				<Grid item component="div" sm={6}>
					<InputLabel className={classes.label}>Minimum Age</InputLabel>
					<TextField
						variant="outlined"
						size="small"
						disabled
						value={business.policy.minAge}
						fullWidth
						multiline
						className={classes.textField}
					/>
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
