import React, { useState } from 'react';

import { getMenuRepo } from 'src/menuRepo';

import Layout from 'src/components/layout';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: `-10px`,
		padding: `10px`
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
	fullWidth: {
		width: `100%`
	},
	displayEnd: {
		display: `flex`,
		justifyContent: `space-around`
	}
}));

export default function EmployeeCard({ id, index, openEdit, employeeInfo }) {
	const classes = useStyles();

	const [username, setUsername] = useState(employeeInfo.username);
	const [password, setPassword] = useState(employeeInfo.password);
	const [showPassword, setShowPassword] = useState(false);
	const [showCPassword, setShowCPassword] = useState(false);

	// Setup repo
	// const repo = getMenuRepo({
	// 	env: process.env.NEXT_PUBLIC_ENV,
	// 	url: process.env.NEXT_PUBLIC_BE,
	// 	id: id
	// });

	async function deleteItem(e) {
		e.preventDefault();

		try {
			await repo.deleteItem(employee[index].name);

			let tmp = [...employee];
			tmp.splice(index, 1);

			setEmployee(tmp);
		} catch (e) {
			console.log(e);
		}
	}

	const handleChange = (event) => {
		setShowRecipe({ ...showRecipe, [event.target.name]: event.target.checked });
	};

	return (
		<Card className={classes.root}>
			<Grid container className={classes.root} spacing={2}>
				{/* --- username section --- */}
				<Grid item xs={5}>
					<InputLabel className={classes.label}>Username</InputLabel>
					<TextField
						variant="outlined"
						fullWidth
						placeholder="name"
						className={classes.textField}
						value={username}
					/>
				</Grid>

				{/* --- password section --- */}
				<Grid item xs={5}>
					<InputLabel className={classes.label}>Password</InputLabel>
					<FormControl className={classes.fullWidth} variant="outlined">
						<OutlinedInput
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => {
											setShowPassword(!showPassword);
										}}
										onMouseDown={(e) => {
											e.preventDefault();
										}}
										edge="end"
									>
										{showCPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Grid>

				<Grid item xs={2} className={classes.displayEnd}>
					{/* --- edit button section --- */}
					<Button size="large" disableElevation onClick={() => openEdit()}>
						<EditIcon color="primary" />
					</Button>
					{/* --------------------------------------- */}
					{/* --- delete button section --- */}
					<Button size="large" disableElevation onClick={deleteItem}>
						<DeleteOutlineIcon color="primary" />
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
}
