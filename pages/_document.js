import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		// Wrap App in Material server side stylesheet
		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
			});

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
		};
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
