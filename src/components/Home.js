import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';
import { Link } from 'preact-router';
import { TextField, Card, Layout, Container, Button } from 'preact-mdl';
import styled from 'styled-components';

import bindActions from '../utils/bindActions';
import reducers from '../reducers';
import { getWalletIds } from '../actions/wallet';
import Wallet from './Wallet';

const Form = styled.form`
	align-text: center;
	margin: auto;
`;

@connect(reducers, bindActions({ getWalletIds }))
export default class Home extends Component {

	getWallets = (appHandle) => {
		console.log('getWallets', appHandle);
		this.props.getWalletIds(appHandle);
	};

	render({ wallets, authorizations: { appHandle, authUri } }, { text }) {
		return (
			<Container>
				<Card shadow={2}>
			        <Link href="/create_wallet">CreateWallet</Link>

					<a onClick={(e) => this.context.router.push('/create_wallet')}>Create Wallet</a>
					<a onClick={(e) => this.getWallets(appHandle)}>Load Wallets</a>
					<ul>
						{ wallets.map(wallet => (
							<Wallet key={wallet.id} wallet={wallet} />
						)) }
					</ul>
				</Card>
			</Container>
		);
	}
}
