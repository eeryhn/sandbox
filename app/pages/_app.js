import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { UserContext } from '../components/UserContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.session) {
      pageProps.user = ctx.req.session.user;
    }
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user
    };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
        <ThemeProvider theme={theme}>
          <Head>
            <title>Endless Fetch</title>
            {/* Use minimum-scale=1 to enable GPU rasterization */}
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
          </Head>
          <UserContext.Provider value={this.state.user}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </UserContext.Provider>
        </ThemeProvider>
    );
  }
}

export default MyApp;
