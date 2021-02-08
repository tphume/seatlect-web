import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { getUserRepo } from 'src/userRepo';
import RegisterForm from 'src/components/RegisterForm';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
	root: {
		height: `100vh`
	},
	loginRoot: {
		padding: `10vh 12.5% 10vh 12.5%`
	},
	loginSubtitle: {
		color: `#BDBDBD`
	},
	loginButton: {
		marginTop: `1rem`,
		padding: `12px 22px`
	},
	createButton: {
		fontWeight: `700`
	}
});

export default function Login() {
	const classes = useStyles();
	const router = useRouter();

	const userRepo = getUserRepo({ env: process.env.NODE_ENV, url: process.NEXT_PUBLIC_BE });

	// Input state
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	// Presentation state
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [regForm, setRegForm] = useState(false);

	// Handlers
	async function handleLogin(e) {
		e.preventDefault();
		setLoading(true);

		try {
			await userRepo.login({ username, password });
			router.push('/home/' + localStorage.getItem('_id'));
		} catch (e) {
			setError(true);
		}

		setLoading(false);
	}

	function closeError(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		setError(false);
	}

	return (
		<Grid container component="main" spacing={0} className={classes.root}>
			<RegisterForm visible={regForm} setVisible={setRegForm} />
			<Grid item component="div" sm={6}></Grid>
			<Grid item component="section" sm={6} className={classes.loginRoot}>
				<Box marginBottom={`2rem`}>
					<Typography component="h1" variant="h3">
						Seatlect
					</Typography>
					<Typography component="h3" variant="h6" classes={{ root: classes.loginSubtitle }}>
						Please login to continue
					</Typography>
				</Box>
				<form autoComplete="off">
					<TextField
						required
						variant="outlined"
						fullWidth
						margin="normal"
						disabled={loading}
						label="Username"
						placeholder="Jiaroach"
						InputLabelProps={{ shrink: true }}
						value={username}
						onChange={(e) => setUsername(e.value)}
					/>
					<TextField
						required
						variant="outlined"
						fullWidth
						margin="normal"
						disabled={loading}
						label="Password"
						placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
						InputLabelProps={{ shrink: true }}
						type="password"
						value={password}
						onChange={(e) => setPassword(e.value)}
					/>
					<Button
						variant="contained"
						color="primary"
						size="large"
						disabled={loading}
						disableElevation
						fullWidth
						classes={{ root: classes.loginButton }}
						onClick={handleLogin}
					>
						Sign in
					</Button>
				</form>
				<p style={{ marginTop: `2rem` }}>
					Don't have an account yet?
					<Button
						size="small"
						color="secondary"
						classes={{ root: classes.createButton }}
						onClick={() => setRegForm(true)}
					>
						Create account
					</Button>
				</p>
				<Snackbar open={error} autoHideDuration={3000} onClose={closeError}>
					<Alert onClose={closeError} severity="error">
						Authentication error
					</Alert>
				</Snackbar>
			</Grid>
		</Grid>
	);
}

export async function getServerSideProps(ctx) {
	// If already logged in - redirect to homepage
	if (ctx.req.cookies.token != undefined) {
		return { redirect: { destination: '/', permanent: false } };
	}

	return { props: {} };
}

// Helper function
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
