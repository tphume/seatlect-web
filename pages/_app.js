import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from 'src/theme.js';

function MyApp({ Component, pageProps }) {
  // When render on client remove server-side injected css
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  if (typeof window === 'undefined' && ctx.res.writeHead) {
    if (ctx.req.cookies.token == undefined && ctx.req.url !== '/login') {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }
  }

  return {};
};

export default MyApp;
