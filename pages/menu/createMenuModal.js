import React, { useState } from 'react';

import { getMenuRepo } from 'src/menuRepo';

import Layout from 'src/components/layout';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Image from 'next/image';
import { withStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';

import placeholderImg from 'src/utils/image';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'absolute',
		left: `25vw`,
		top: `15vh`,
		width: `50vw`,
		height: `70vh`,
		backgroundColor: `white`,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	},
	heroImage: {
		width: 62.6953125,
		height: 40.0593471810089
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: theme.palette.primary.main,
		padding: `1rem`
	},
	drawerContainer: {
		overflow: 'auto'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	whiteColor: {
		color: `white`
	},
	primaryColor: {
		color: theme.palette.primary.main
	},
	item: {
		'&.Mui-selected, &.Mui-selected:hover': {
			backgroundColor: 'white'
		}
	},
	logoutButton: {
		'&.MuiListItem-button': {
			backgroundColor: theme.palette.error.main
		}
	},
	displayImage: {
		height: 200
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	label: {
		color: `rgba(0, 0, 0, 0.87)`,
		fontWeight: `500`,
		fontSize: `1rem`,
		marginRight: `1rem`
	},
	textField: {
		margin: `0 0 1.25rem 0`
	},
	Button: {
		width: `6.5rem`
	},
	cancelButton: {
		width: `6.5rem`,
		marginRight: `1.25rem`
	}
}));

export default function CreateMenuModal({ id, menu, setMenu, onClickClose }) {
	const classes = useStyles();

	const [image, setImage] = useState(placeholderImg);
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [desc, setDesc] = useState('');

	// Setup repo
	const repo = getMenuRepo({
		env: process.env.NEXT_PUBLIC_ENV,
		url: process.env.NEXT_PUBLIC_BE,
		id: id
	});

	async function appendItem(e) {
		e.preventDefault();

		try {
			let req = {
				name,
				description: desc,
				price,
				image
			};

			const res = await repo.appendItem(req);

			req.image = res;
			setMenu([...menu, req]);

			onClickClose();
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<Card className={classes.root}>
			<h1>New menu Item</h1>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Card className={classes.displayCard} variant="outlined">
						<CardMedia
							className={classes.displayImage}
							image={image}
							alt="food image"
							component="img"
							height="250"
						/>
						<input type="file" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
					</Card>
				</Grid>
				<Grid item xs={8}>
					<Box display="flex" alignItems="center" className={classes.textField}>
						<Grid xs={3} className={classes.label}>
							<Box textAlign="right">Name</Box>
						</Grid>
						<Grid xs={9}>
							<TextField
								variant="outlined"
								size="small"
								// disabled
								fullWidth
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Grid>
					</Box>
					<Box display="flex" alignItems="center" className={classes.textField}>
						<Grid xs={3} className={classes.label}>
							<Box textAlign="right">Price</Box>
						</Grid>
						<Grid xs={9}>
							<TextField
								variant="outlined"
								size="small"
								fullWidth
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Grid>
					</Box>
					<Box display="flex" alignItems="center" className={classes.textField}>
						<Grid xs={3} className={classes.label}>
							<Box textAlign="right">Description</Box>
						</Grid>
						<Grid xs={9}>
							<TextField
								variant="outlined"
								size="small"
								// disabled
								fullWidth
								multiline
								value={desc}
								onChange={(e) => setDesc(e.target.value)}
							/>
						</Grid>
					</Box>
					<Box display="flex" justifyContent="flex-end">
						<Button
							variant="contained"
							className={classes.cancelButton}
							color="primary"
							size="large"
							disableElevation
							onClick={() => {
								onClickClose();
							}}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							className={classes.Button}
							color="primary"
							size="large"
							disableElevation
							onClick={appendItem}
						>
							Save
						</Button>
					</Box>
				</Grid>
			</Grid>
			<Box display="flex" justifyContent="space-between">
				{/* <img alt="food image" /> */}
			</Box>
		</Card>
	);
}
