import '../styles/index.css';

import App from 'next/app';
import { Grommet, grommet as grommetTheme } from 'grommet';

import { AuthProvider } from '../hooks/useAuth';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <AuthProvider>
        <Grommet theme={grommetTheme}>
          <Component {...pageProps} />
        </Grommet>
      </AuthProvider>
    );
  }
}
