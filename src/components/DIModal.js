import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	updateButton: {
		margin: `1rem 0 1rem 0`
	}
}));

export default function DIModal({ visible, setVisible, image, setImage }) {
	const classes = useStyles();

	const [tmp, setTmp] = useState(image);

	// Handlers
	function handleClose() {
		setVisible(false);
	}

	return (
		<Dialog open={visible} onClose={handleClose} fullWidth>
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
				>
					Update
				</Button>
			</DialogContent>
		</Dialog>
	);
}
