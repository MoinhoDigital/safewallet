import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { Router, Route } from 'preact-router';

// Load offline plugin only on production
process.env.NODE_ENV === 'production' && require('./offline');

import 'material-design-lite/material';

import { Layout } from 'preact-mdl';

import Dashboard from './components/Dashboard';
import ErrorPage from './components/404';

import store from './store';

import './style/index.scss';
import Logo from 'svg-url-loader!./assets/img/logo.svg';

const Header = () => (
	<Layout.Header>
		<Layout.HeaderRow>
			<Layout.Title>
				<img src={Logo} />
				<a href="/" style={{ color: 'white' }}>SAFE Wallet</a>
			</Layout.Title>
			<Layout.Spacer />
		</Layout.HeaderRow>
	</Layout.Header>
);

render(
	<Provider store={store}>
		<Layout fixed-header>
			<Header />
			<Router>
				<Dashboard path='/' />
				<ErrorPage default />
			</Router>
		</Layout>
	</Provider>, document.body);
