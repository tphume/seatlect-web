import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// visible (and setVisible) should be a React state variable and it set state function
export default function RequestForm({ visible, setVisible }) {
	function handleClose() {
		setVisible(false);
	}

	return (
		<Dialog open={visible} onClose={handleClose}>
			<DialogTitle>Change Request</DialogTitle>
		</Dialog>
	);
}
