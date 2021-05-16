import React, { useState } from 'react';

import { getEmployeeRepo } from 'src/employeeRepo';
import Layout from 'src/components/layout';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import placeholderImg from 'src/utils/image';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'absolute',
		left: `25vw`,
		top: `25vh`,
		width: `50vw`,
		height: `60vh`,
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
		padding: `0px 0px 15px 0px`
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
	},
	flex: {
		display: `flex`,
		justifyContent: `flex-end`,
		marginTop: `20px`
	},
	flex2: {
		display: `flex`,
		justifyContent: `flex-start`,
		marginTop: `20px`
	},
	fullWidth: {
		width: `100%`
	},
	paddingBot: {
		paddingBottom: `15px`
	},
	headerText: {
		marginBottom: `10px`
	},
	errorText: {
		color: `red`,
		justifyContent: `flex-start`
	}
}));

export default function CreateEmployee({ id, employee, setEmployee, onClickClose }) {
	const classes = useStyles();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [cpassword, setCPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showCPassword, setShowCPassword] = useState(false);
	const [error, setError] = useState('');
	const [showError, setShowError] = useState(false);

	// Setup repo
	const repo = getEmployeeRepo({
		env: process.env.NEXT_PUBLIC_ENV,
		url: process.env.NEXT_PUBLIC_BE,
		id: id
	});

	async function appendItem(e) {
		e.preventDefault();

		try {
			if (password != cpassword) {
				setError('Password and confirm password is not the same');
				setShowError(true);
				throw 'Password and confirm password is not the same';
			}

			const res = await repo.createEmployee({ username, password });
			setEmployee([...employee, res]);

			onClickClose();
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<Card className={classes.root}>
			<h1 className={classes.headerText}>New employee account</h1>
			<Grid container spacing={0}>
				<Grid item xs={12}>
					<InputLabel className={classes.label}>Username</InputLabel>
					{/* --- Start time --- */}
					<TextField
						variant="outlined"
						fullWidth
						placeholder="name"
						className={classes.textField}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</Grid>

				{/* --- Password textfield --- */}
				<Grid item xs={12} className={classes.paddingBot}>
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

				{/* --- Confirm password textfield --- */}
				<Grid item xs={12}>
					<InputLabel className={classes.label}>Confirm Password</InputLabel>
					<FormControl className={classes.fullWidth} variant="outlined">
						<OutlinedInput
							type={showCPassword ? 'text' : 'password'}
							value={cpassword}
							onChange={(e) => {
								setCPassword(e.target.value);
							}}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => {
											setShowCPassword(!showCPassword);
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

				{/* --- Error massage + Button --- */}
				<Grid item xs={6} className={classes.flex2}>
					{/* --- Error text ---- */}
					{showError ? <p className={classes.errorText}>{error}</p> : ''}
				</Grid>
				<Grid item xs={6} className={classes.flex}>
					{/* --- Cancel Button --- */}
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
					{/* --- Save Button --- */}
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
				</Grid>
			</Grid>
		</Card>
	);
}
