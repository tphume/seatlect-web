import React, { useState, useEffect } from 'react';
import Layout from 'src/components/layout';
import { getReservationRepo } from 'src/reservationRepo';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import PlacementModal from './placementModal';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		backgroundColor: `#F2D5F1`,
		margin: `10px`,
		padding: `1px 20px 1px 20px`
	},
	paper_padding: {
		padding: `10px`
	},
	control: {
		padding: theme.spacing(2)
	},
	row: {
		display: `flex`,
		margin: `10px -20px 10px 0px`
	},
	paragraph: {
		marginBlockStart: `0rem`,
		marginBlockEnd: `0rem`,
		color: 'red'
	},
	cancelButton: {
		backgroundColor: `#F57070`,
		color: theme.palette.error.contrastText,
		'&:hover': {
			backgroundColor: theme.palette.error.dark
		},
		'&:disabled': {
			backgroundColor: theme.palette.error.light
		}
	},
	spacing: {
		width: `10px`
	},
	marginButtonRow: {
		marginTop: `-0.7rem`,
		marginBottom: `0.5rem`
	}
}));

export default function Time({ time }) {
	const classes = useStyles();

	const [id, setId] = useState('');
	useEffect(() => setId(localStorage.getItem('_id')), []);

	// setup repo
	const repo = getReservationRepo({
		env: process.env.NEXT_PUBLIC_ENV,
		url: process.env.NEXT_PUBLIC_BE,
		id: id
	});

	var startTime = time.start.slice(0, 16);
	var endTime = time.end.slice(0, 16);
	const [seats, setSeats] = useState();
	const [openCreate, setOpenCreate] = React.useState(false);

	var seat = '';
	for (let i = 0; i < time.placement.seats.length; i++) {
		if (time.placement.seats[i].status === 'TAKEN') {
			if (seat === '') {
				seat += time.placement.seats[i].name;
			} else {
				seat += ', ' + time.placement.seats[i].name;
			}
		}
	}

	// setup handlers
	const handleOpenCreate = () => {
		setOpenCreate(true);
	};

	const handleCloseCreate = () => {
		setOpenCreate(false);
	};

	const cancel = async () => {
		try {
			await repo.cancelReservation(time.id);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Paper className={classes.paper}>
			<p classname={classes.paragraph}>
				<b>Start: </b> {startTime}
				<br></br>
				<b>End: </b> {endTime}
			</p>
			<p>
				<b>Reserved table :</b> {seat}{' '}
			</p>
			<Box className={classes.marginButtonRow} display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					className={classes.Button}
					color="primary"
					size="small"
					disableElevation
					onClick={() => handleOpenCreate()}
				>
					View placement
				</Button>
				<div className={classes.spacing}></div>
				<Button
					variant="contained"
					className={classes.cancelButton}
					size="small"
					disableElevation
					onClick={cancel}
				>
					Cancel
				</Button>
			</Box>
			<Modal
				open={openCreate}
				onClose={handleCloseCreate}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<PlacementModal
					className={classes.modal}
					reservation={time}
					onClickClose={() => {
						handleCloseCreate();
					}}
				/>
			</Modal>
		</Paper>
	);
}
