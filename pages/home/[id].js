import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import GoogleMapReact from 'google-map-react';

import Layout from 'src/components/layout';
import RequestForm from 'src/components/RequestForm';
import DIModal from 'src/components/DIModal';
import AppendImage from 'src/components/AppendImage';
import { getBusinessRepo } from 'src/businessRepo';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';

import Carousel from 'react-material-ui-carousel';

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
	}
}));

export default function Home({ business }) {
	// Initial setup
	const classes = useStyles();

	// Id state is the id of the business
	const [id, setId] = useState('');

	// Set if request form should be visible
	const [requestForm, setRequestForm] = useState(false);

	// Set if update display image modal should be visible
	const [diModal, setDIModal] = useState(false);

	// Set if append image modal should be visible
	const [appendModal, setAppendModal] = useState(false);

	// Set display image
	const [di, setDI] = useState(business.displayImage);

	// Set images list
	const [img, setImg] = useState(business.images);

	// load initial id from local storage
	useEffect(function () {
		setId(localStorage.getItem('_id'));
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

	// TODO: displayImage modal and handlers
	// TODO: images modal and handlers

	return (
		<Layout id={id}>
			<RequestForm
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
			<DIModal visible={diModal} setVisible={setDIModal} image={di} setImage={setDI} id={id} />
			<AppendImage
				visible={appendModal}
				setVisible={setAppendModal}
				images={img}
				setImages={setImg}
				id={id}
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
					<div className={classes.mapContainer}>
						<GoogleMapReact
							bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP }}
							defaultCenter={{
								lat: business.location.latitude,
								lng: business.location.longitude
							}}
							defaultZoom={17}
						>
							<LocationOnIcon
								lat={business.location.latitude}
								lng={business.location.longitude}
								color="error"
							/>
						</GoogleMapReact>
					</div>
					<Tooltip title="Make a request to change business information">
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
					</Tooltip>
				</Grid>
				<Grid item component="div" sm={6}>
					<Card className={classes.displayCard} variant="outlined">
						<Image src={di} width={300} height={180} />
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
									<Button size="small" color="primary" onClick={() => setDIModal(true)}>
										Edit
									</Button>
								</Tooltip>
							</CardActions>
						</div>
					</Card>
					<Carousel indicators={true} navButtonsAlwaysInvisible>
						{img.map((src, i) => (
							<Card className={classes.displayCard} variant="outlined">
								<Image src={src} width={300} height={180} />
								<div>
									<CardContent>
										<Typography gutterBottom variant="h6" component="h2">
											Image slider
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p">
											Will be shown to the mobile application in an image slider
										</Typography>
									</CardContent>
									<CardActionArea />
									<CardActions>
										<Tooltip title="Add a new image to the images list">
											<Button
												size="small"
												color="primary"
												variant="outlined"
												onClick={() => setAppendModal(true)}
											>
												Add
											</Button>
										</Tooltip>
										<Tooltip title="Delete the current image for the images list">
											<Button size="small" color="secondary" variant="contained">
												Delete
											</Button>
										</Tooltip>
									</CardActions>
								</div>
							</Card>
						))}
					</Carousel>
				</Grid>
			</Grid>
		</Layout>
	);
}

function ImageItem({ src }) {
	return <Image src={src} layout="fill" />;
}

export async function getServerSideProps(ctx) {
	// Get params
	let env = process.env.NEXT_PUBLIC_ENV;
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
