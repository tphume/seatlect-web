import { createMuiTheme } from '@material-ui/core';
import 'fontsource-dm-sans';

const theme = createMuiTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#5d55b4'
		},
		secondary: {
			main: '#f2b705'
		},
		error: {
			main: '#f24b4b'
		},
		success: {
			main: '#65bf7c'
		}
	},
	typography: {
		fontFamily: 'DM Sans',
		button: {
			textTransform: `none`
		}
	},
	props: {
		MuiAppBar: {
			color: 'secondary'
		}
	}
});

export default theme;
