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
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: `0.25rem`
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
	}
}));

export default function MenuCard({ id, index, openEdit, menu, setMenu }) {
	const classes = useStyles();
	const [showRecipe, setShowRecipe] = React.useState({
		checkedA: true
	});

	// Setup repo
	const repo = getMenuRepo({
		env: process.env.NEXT_PUBLIC_ENV,
		url: process.env.NEXT_PUBLIC_BE,
		id: id
	});

	async function deleteItem(e) {
		e.preventDefault();

		try {
			await repo.deleteItem(menu[index].name);

			let tmp = [...menu];
			tmp.splice(index, 1);

			setMenu(tmp);
		} catch (e) {
			console.log(e);
		}
	}

	const handleChange = (event) => {
		setShowRecipe({ ...showRecipe, [event.target.name]: event.target.checked });
	};

	return (
		<Card className={classes.root}>
			<Box display="flex" justifyContent="space-between">
				{/* <img alt="food image" /> */}
				<Card className={classes.displayCard} variant="outlined">
					<CardMedia
						className={classes.displayImage}
						image={menu[index].image}
						alt="food image"
						component="img"
						height="75"
						width="88"
					/>
				</Card>
				<Box alignSelf="center" width="80%">
					<div>{menu[index].name}</div>
				</Box>
				<Tooltip title="Edit menu">
					<Button
						className={classes.createDishButton}
						size="large"
						disableElevation
						onClick={() => openEdit()}
					>
						<EditIcon color="primary" />
					</Button>
				</Tooltip>
				<Tooltip title="Delete Item">
					<Button size="large" disableElevation onClick={deleteItem}>
						<DeleteOutlineIcon color="primary" />
					</Button>
				</Tooltip>
			</Box>
		</Card>
	);
}
