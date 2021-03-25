import React, { useState } from 'react';
import Layout from 'src/components/layout';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Image from 'next/image';
import { withStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import { NoEncryption } from '@material-ui/icons';

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
		height: 75,
		width: 88
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

export default function EditMenuModal({ foodInfo, onClickClose }) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<h1>Edit menu</h1>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Paper className={classes.paper}>image upload</Paper>
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
								defaultValue={foodInfo.name}
							/>
						</Grid>
					</Box>
					<Box display="flex" alignItems="center" className={classes.textField}>
						<Grid xs={3} className={classes.label}>
							<Box textAlign="right">Price</Box>
						</Grid>
						<Grid xs={9}>
							<TextField variant="outlined" size="small" fullWidth defaultValue={foodInfo.price} />
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
								defaultValue={foodInfo.description}
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
							onClick={() => {
								handleOpen();
							}}
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
