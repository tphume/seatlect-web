import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';

import RequestFrom from 'src/components/RequestForm';
import { getBusinessRepo } from 'src/businessRepo';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import MenuCard from './menuCard';
import Modal from '@material-ui/core/Modal';
import CreateMenuModal from './createMenuModal';
import EditMenuModal from './editMenuModal';

const useStyles = makeStyles((theme) => ({
	root: {
    display: 'flex',
  },
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
	createDishButton:{
		// width: `9rem`,
		height: `2.625rem`,
	},
	iconColor:{
		color: `white`,
	},
	headerText:{
		fontWeight: 900,
		fontSize: `2.25rem`,
	},
	header2Text:{
		fontSize: `2rem`,
	},
	paper: {
    position: 'absolute',
		left: `25vw`,
		top: `15vh`,
    width: `50vw`,
		height: `70vh`,
    backgroundColor: `white`,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const initialData = [
	{
		image : "image",
		name : "main 1",
		status : true,
		title: "name",
		price: "350.00",
		catagory: "main dish",
		allergic: "seafood"
	},
	{
		image : "image",
		name : "main 2",
		status : false,
		title: "name",
		price: "320.00",
		catagory: "Main dish",
		allergic: "glutten"
	},
	{
		image : "image",
		name : "main 3",
		status : false,
		title: "name",
		price: "295.00",
		catagory: "Main dish",
		allergic: "egg"
	},
	{
		image : "image",
		name : "side 1",
		status : false,
		title: "name",
		price: "120.00",
		catagory: "Side dish",
		allergic: "cellery"
	},
	{
		image : "image",
		name : "side 2",
		status : false,
		title: "name",
		price: "170.00",
		catagory: "Side dish",
		allergic: "glutten"
	},
	{
		image : "image",
		name : "side 3",
		status : false,
		title: "name",
		price: "85.00",
		catagory: "Side dish",
		allergic: "egg and gluten"
	},
]
export default function Menu() {
	// Initial setup
	const classes = useStyles();

	// Id state is the id of the business
	const [id, setId] = useState('');
	const [datas,setData] = useState(initialData);
	const [datas2,setData2] = useState(initialData);
	const [openCreate, setOpenCreate] = React.useState(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const [selectedFood,setFoodInfo] = React.useState('');
  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

	const handleCloseCreate = () => {
    setOpenCreate(false);
  };

	const handleOpenEdit = (info) => {
    setOpenEdit(true);
		setFoodInfo(info)
  };
	const handleCloseEdit = () => {
    setOpenEdit(false);
  };
	// Set if request form should be visible
	const [requestForm, setRequestForm] = useState(false);

	// load initial id from local storage
	useEffect(function () {
		setId(localStorage.getItem('_id'));
		setData(initialData)
		setData2(initialData[1])
	}, []);

	const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Create new menu</h2>
      <p id="simple-modal-description">
        test
      </p>
    </div>
  );
	// Check that data is loaded correctly
	// if (Object.keys(business).length === 0 && business.constructor === Object) {
	// 	return (
	// 		<Layout id={id}>
	// 			<div>
	// 				<h1>An error occurred - try refreshing</h1>
	// 			</div>
	// 		</Layout>
	// 	);
	// }

	// TODO: displayImage modal and handlers
	// TODO: images modal and handlers
	// TODO: Menu card
	// TODO: create new menu
	// TODO: menu in catagory

	return (
		<Layout id={id}>
			{/*   ----- header section -----   */}
			<Box display="flex" flexDirection="row" justifyContent="space-between" >
				<Box alignSelf="center">
					<div className={classes.headerText}>Menu</div>
				</Box>
				<Box>
					<Tooltip title="Create new menu ">
						<Button
							variant="contained"
							className={classes.createDishButton}
							color="primary"
							size="large"
							disableElevation
							onClick={() => handleOpenCreate()}
						>
              <AddCircleIcon className={classes.iconColor}/>
							<div style={{width:"0.5rem"}}></div>
													creatEdit item
						</Button>
					</Tooltip>
				</Box>
			</Box>
			<div>

		{/*   ----- Modal create section -----   */}
			<Modal
        open={openCreate}
        onClose={handleCloseCreate}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CreateMenuModal className={classes.paper} onClickClose={() => {handleCloseCreate()}}/>
      </Modal>


			{/*   ----- Modal edit section -----   */}
			<Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <EditMenuModal className={classes.paper} foodInfo={selectedFood} onClickClose={() => {handleCloseEdit()}}/>
      </Modal>


			{/*   ----- Modal delete section -----   */}
			{/*   ----- Menu section -----   */}
				<div>
					<div className={classes.root}>
						<FolderOpenIcon />
						<Box alignSelf="center">
							<div style={{marginLeft: "0.5rem"}}>Main dish</div>
						</Box>
					</div>
					<Box>
						{datas.map((rect, i) => {
							return (
								<MenuCard
									key={i}
									foodInfo={rect}
									openEdit={()=>handleOpenEdit(rect)}
								></MenuCard>
							);
						})}
						{/* <MenuCard foodInfo={initialData[0]} openEdit={()=>{handleOpenEdit(initialData[0])}}/>
						<MenuCard foodInfo={initialData[1]} openEdit={()=>{handleOpenEdit(initialData[1])}}/>
						<MenuCard foodInfo={initialData[2]} openEdit={()=>{handleOpenEdit(initialData[2])}}/> */}
					</Box>
				</div>
				<div>
					<div className={classes.root}>
						<FolderOpenIcon />
						<Box alignSelf="center">
							<div style={{marginLeft: "0.5rem"}}>Side dish</div>
						</Box>
					</div>
					<Box>
						<MenuCard foodInfo={initialData[3]} openEdit={()=>{handleOpenEdit(initialData[3])}}/>
						<MenuCard foodInfo={initialData[4]} openEdit={()=>{handleOpenEdit(initialData[4])}}/>
						<MenuCard foodInfo={initialData[5]} openEdit={()=>{handleOpenEdit(initialData[5])}}/>
						<MenuCard foodInfo={initialData[3]} openEdit={()=>{handleOpenEdit(initialData[3])}}/>
						<MenuCard foodInfo={initialData[4]} openEdit={()=>{handleOpenEdit(initialData[4])}}/>
						<MenuCard foodInfo={initialData[5]} openEdit={()=>{handleOpenEdit(initialData[5])}}/>
					</Box>
				</div>

			</div>
		</Layout>
	);
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:9000/api/v1/business/placholder/menu`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return { props: { data } }
// }