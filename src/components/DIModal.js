import React, { useState } from 'react';

import { getBusinessRepo } from 'src/businessRepo';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	updateButton: {
		margin: `1rem 0 1rem 0`
	}
}));

export default function DIModal({ visible, setVisible, image, setImage, id }) {
	const classes = useStyles();

	const [tmp, setTmp] = useState(image);

	// Presentation state
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	// Setup repo
	const repo = getBusinessRepo({
		env: process.env.NEXT_PUBLIC_ENV,
		url: process.env.NEXT_PUBLIC_BE,
		id
	});

	// Handlers
	function handleClose() {
		setVisible(false);
	}

	function handleAlert(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		setSuccess(false);
	}

	async function handleUpdate(e) {
		setLoading(true);

		try {
			const res = await repo.updateDI({ displayImage: tmp });
			setSuccess(true);
			setImage(res);
			s;
		} catch (e) {
			// TODO: Snackbar error?
		}

		setLoading(false);
	}

	return (
		<Dialog open={visible} onClose={handleClose} fullWidth>
			{loading && <LinearProgress />}
			<DialogTitle>Update Display Image</DialogTitle>
			<DialogContent>
				<Card variant="outlined">
					<CardMedia image={tmp} alt="Display image to use" component="img" width="300" />
					<input type="file" onChange={(e) => setTmp(URL.createObjectURL(e.target.files[0]))} />
				</Card>
				<Button
					variant="contained"
					color="primary"
					size="medium"
					disableElevation
					fullWidth
					className={classes.updateButton}
					onClick={handleUpdate}
				>
					Update
				</Button>
			</DialogContent>
			<Snackbar open={success} autoHideDuration={2000} onClose={handleAlert}>
				<MuiAlert elevation={6} variant="filled" onClose={handleAlert} severity="success">
					Business image updated
				</MuiAlert>
			</Snackbar>
		</Dialog>
	);
}
