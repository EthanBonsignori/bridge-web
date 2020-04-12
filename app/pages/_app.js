import App from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import { createGlobalStyle } from 'styled-components';
import makeStore from '../redux/store';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Quicksand';
      src: url('/fonts/Quicksand-Bold.ttf');
      src: url('/fonts/Quicksand-Light.ttf');
      src: url('/fonts/Quicksand-Medium.ttf');
      src: url('/fonts/Quicksand-Regular.ttf');
      src: url('/fonts/Quicksand-SemiBold.ttf');
  }
  body {
    margin: 0;
    font-family: 'Quicksand';
    text-rendering: optimizeLegibility;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    };
  }

  render() {
    // pageProps that were returned  from 'getInitialProps' are stored in the props
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <GlobalStyle />
        <Component {...pageProps}/>
      </Provider>
    );
  }
}

// withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore, { debug: false })(MyApp);
