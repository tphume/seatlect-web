import React, { Component, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import shape from '@material-ui/core/styles/shape';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
const canvasOutline = `800px`;

// pre-define type
const WALL1 = 'BLUE_WALL'
const WALL2 = 'BROWN_WALL'
const OBJ1 = 'OBJECT_CIRCLE'
const OBJ2 = 'OBJECT_SQUARE'
const TABLE1 = 'SHORT_TABLE' 
const TABLE2 = 'TABLE'
const TABLE3 = 'LONG_TABLE'

const useStyles = makeStyles((theme) => ({
	label: {
		color: `rgba(0, 0, 0, 0.87)`,
		fontWeight: `700`,
		fontSize: `0.75rem`,
		margin: '0 0 3px 0'
	},
	textField: {
		margin: `0 0 0rem 0`,
		padding: `20px`,
		paddingRight: `20px`
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
		width: `300px`
	},
	test: {
		display: `flex`
	},
	canvas: {
		marginLeft: `1vw`,
		width: canvasOutline
	},
	sidebar: {
		width: `25vw`,
		height: `80vh`,
		backgroundColor: `#E5E5E5`,
		display: `inline`
	},
	headerSidebar: {
		marginBlockEnd: `0`
	},
	subHeaderSidebar: {
		marginBlockStart: `0.25rem`,
		marginBlockEnd: `0.5rem`,
	},
	subHeaderSidebar_Inactive:{
		marginBlockStart: `0.25rem`,
		marginBlockEnd: `0.5rem`,
		color: `#9d9d9d`
	},
	inputGroup: {
		padding: `10px`
	},
	inputGroupText: {
		display: `inline`,
		width: `6rem`
	},
	category: {
		display: `flex`,
		alignItems: `center`
	},
	headSlider: {
		width: `30vw`,
		height: `2.5rem`,
		display: `block`,
		justifyContent: `center`,
		borderTopLeftRadius: `20px`,
		borderTopRightRadius: `20px`,
		backgroundColor: `#E5E5E5`
	},
	headSliderSelected: {
		width: `30vw`,
		height: `2.5rem`,
		borderTopLeftRadius: `20px`,
		borderTopRightRadius: `20px`,
		backgroundColor: `#5D55B4`,
		color: `white`,
		display: `block`
	},
	center: {
		display: `flex`,
		justifyContent: `center`,
		lineHeight: `3rem`
	},
	sliderBarSelected: {
		display: `flex`,
		justifyContent: `space-evenly`,
		paddingLeft: `20%`,
		paddingRight: `20%`,
		paddingTop: `10px`,
		height: `110px`
	},
	sliderBar: {
		display: `none`
	},
	navLink: {
		width: `60%`,
		display: `flex`,
		justifyContent: `space-around`,
		alignItems: `center`,
		listStyle: `none`
	},
	link: {
		color: `white`
	},
	sideBarRow:{
		paddingTop: `0`
	},
	button:{
		// backgroundColor: `red`,	
	},
	centerAlign:{
		display: `flex`,
		justifyContent: `center`
	},
	primaryColor:{
		color: theme.palette.primary.main
	}
}));

const Sidebar = ({ shapeProps, onChangeSidebar, onDelete }) => {
	const classes = useStyles();
	const maxGuest = React.useRef();
	console.log(shapeProps);
	try {
		console.log(shapeProps);
		console.log(shapeProps.x);
		console.log(shapeProps.y);
		console.log(shapeProps.rotation);
		console.log(shapeProps.space);
		console.log(shapeProps.id);
		maxGuest.current = shapeProps.space;
		const xValue = Math.round(shapeProps.x);
		const yValue = Math.round(shapeProps.y);
		var isTable = false;
		
		if(shapeProps.type == TABLE1 || shapeProps.type == TABLE2 || shapeProps.type == TABLE3){
			isTable = true;
		}
		
		var typeOfOBJ;
		if(shapeProps.type == TABLE1 || shapeProps.type == TABLE2 || shapeProps.type == TABLE3){
			typeOfOBJ = 'Table'
		}
		if(shapeProps.type == WALL1 || shapeProps.type == WALL2){
			typeOfOBJ = 'Wall'
		}
		if(shapeProps.type == OBJ1 || shapeProps.type == OBJ2){
			typeOfOBJ = 'Object'
		}
		return (
			<div className={classes.sidebar}>
				<Grid container spacing={1}>
					{/* Header */}
					<Grid item xs={12}>
						<div className={`${classes.centerAlign} ${classes.primaryColor}`}>
							<h1 className={classes.headerSidebar}>{typeOfOBJ} information</h1>
						</div> 
						<div className={`${classes.centerAlign} ${classes.primaryColor}`}>
							<h3 className={classes.subHeaderSidebar}> : {shapeProps.name}</h3>						
						</div> 
					</Grid>
					<Grid item xs={12}>
						<hr/> 
					</Grid>
					{/*--- X coordinate ---*/}
					<Grid item xs={12}></Grid>
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							variant="outlined"
							id="standard-full-width"
							label="X coordinate"
							placeholder="coordinate"
							value={xValue}
							// helperText="Full width!"
							fullWidth
							disabled
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					{/*--- Y coordinate ---*/}
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							variant="outlined"
							id="standard-full-width"
							label="Y coordinate"
							placeholder="coordinate"
							// helperText="Full width!"
							fullWidth
							disabled
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					{/*--- ID of the object ---*/}
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							variant="outlined"
							id="standard-full-width"
							label="ID"
							placeholder="object id"
							value={shapeProps.id}
							// helperText="Full width!"
							fullWidth
							disabled
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					{/*--- Name of the object ---*/}
					<Grid item xs={12}>
						<TextField
							className={classes.textField}
							variant="outlined"
							id="standard-full-width"
							label="Name"
							placeholder="object name"
							defaultValue={shapeProps.name}
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={ e => {
								console.log(e.target.value)
								console.log(shapeProps.type)
								onChangeSidebar({...shapeProps,name: e.target.value});
								shapeProps.name = e.target.value
							}}
							onClick={e => {
								console.log(shapeProps.type)
							}}
						/>
					</Grid>
					{/*--- Max Guest ---*/}
					{ isTable && (
						<Grid item xs={12}>
							<TextField
								className={classes.textField}
								variant="outlined"
								id="standard-full-width"
								label="Max guest"
								placeholder="Max number of guest"
								defaultValue={shapeProps.space}
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								onChange={ e => {
									// console.log(e.target.value)
									onChangeSidebar({...shapeProps,space: e.target.value});
									shapeProps.space = e.target.value
								}}
							/>
						</Grid>
						)}
					{/*--- Delete Button ---*/}
					<Grid item xs={12}>
						<div className={classes.centerAlign}>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							startIcon={<DeleteIcon />}
							onClick={(e)=>{
								console.log('delete')
								onDelete(shapeProps.id)
							}}
						>
							Delete
						</Button>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	} catch (error) {
		// console.log(error)
		return (
			<Grid container spacing={3}>
        <Grid item xs={12}>
					<div className={`${classes.centerAlign} ${classes.primaryColor}`}>
						<h1 className={classes.headerSidebar}>Object information</h1>
					</div> 
					<div className={`${classes.centerAlign} ${classes.primaryColor}`}>
						<h3 className={classes.subHeaderSidebar_Inactive}> : object name </h3>						
					</div> 
				</Grid>
				<Grid item xs={12}>
					<hr/> 
				</Grid>
			</Grid>
		);
	}
};

export default Sidebar;
