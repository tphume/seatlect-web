import React, { useState, useEffect } from 'react';

import { getMenuRepo } from 'src/menuRepo';
import Layout from 'src/components/layout';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MenuCard from './menuCard';
import Modal from '@material-ui/core/Modal';

import CreateMenuModal from './createMenuModal';
import EditMenuModal from './editMenuModal';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
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
	createDishButton: {
		// width: `9rem`,
		height: `2.625rem`
	},
	iconColor: {
		color: `white`
	},
	headerText: {
		fontWeight: 900,
		fontSize: `2.25rem`
	},
	header2Text: {
		fontSize: `2rem`
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
		padding: theme.spacing(2, 4, 3)
	}
}));

export default function Menu({ menu }) {
	// Initial setup
	const classes = useStyles();

	// Id state is the id of the business
	const [id, setId] = useState('');
	const [data, setData] = useState(menu);
	const [openCreate, setOpenCreate] = React.useState(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const [selectedFood, setFoodInfo] = React.useState('');
	const handleOpenCreate = () => {
		setOpenCreate(true);
	};

	const handleCloseCreate = () => {
		setOpenCreate(false);
	};

	const handleOpenEdit = (info) => {
		setOpenEdit(true);
		setFoodInfo(info);
	};
	const handleCloseEdit = () => {
		setOpenEdit(false);
	};
	// Set if request form should be visible
	const [requestForm, setRequestForm] = useState(false);

	// load initial id from local storage
	useEffect(function () {
		setId(localStorage.getItem('_id'));
	}, []);

	const body = (
		<div className={classes.paper}>
			<h2 id="simple-modal-title">Create new menu</h2>
			<p id="simple-modal-description">test</p>
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
	// TODO: menu in description

	return (
		<Layout id={id}>
			{/*   ----- header section -----   */}
			<Box display="flex" flexDirection="row" justifyContent="space-between">
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
							<AddCircleIcon className={classes.iconColor} />
							<div style={{ width: '0.5rem' }}></div>
							Create Menu Item
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
					<CreateMenuModal
						className={classes.paper}
						id={id}
						menu={data}
						setMenu={setData}
						onClickClose={() => {
							handleCloseCreate();
						}}
					/>
				</Modal>

				{/*   ----- Modal edit section -----   */}
				<Modal
					open={openEdit}
					onClose={handleCloseEdit}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<EditMenuModal
						className={classes.paper}
						foodInfo={selectedFood}
						onClickClose={() => {
							handleCloseEdit();
						}}
					/>
				</Modal>

				{/*   ----- Modal delete section -----   */}
				{/*   ----- Menu section -----   */}
				<div>
					<Box>
						{data.map((rect, i) => {
							return (
								<MenuCard
									key={rect.name}
									id={id}
									index={i}
									menu={data}
									setMenu={setData}
									openEdit={() => handleOpenEdit(rect)}
								></MenuCard>
							);
						})}
					</Box>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	// Get params
	let env = process.env.NEXT_PUBLIC_ENV;
	let id = ctx.params.id;
	let menu = {};

	// Get initial data
	let menuRepo = getMenuRepo({ env, id, url: process.env.NEXT_PUBLIC_BE });
	try {
		menu = await menuRepo.getMenu();
	} catch (e) {
		// TODO handle error
	}

	return {
		props: {
			menu
		}
	};
}
