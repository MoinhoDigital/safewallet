import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';
import { Link } from 'preact-router';
import { TextField, Card, Layout, Container, Button } from 'preact-mdl';
import styled from 'styled-components';

import bindActions from '../utils/bindActions';
import reducers from '../reducers';
import { getWalletIds, createWallet } from '../actions/wallet';
import Wallet from './Wallet';

const Form = styled.form`
	align-text: center;
	margin: auto;
`;

@connect(reducers, bindActions({ getWalletIds, createWallet }))
export default class Wallets extends Component {

	getWallets = (appHandle) => {
		console.log('getWallets', appHandle);
		this.props.getWalletIds(appHandle);
	};

	submitWallet = (e, app) => {
		e.preventDefault();
		// const { appHandle } = this.props;
		const { text } = this.state;
		this.setState({ text: '' });
		this.props.createWallet(app, text);
	};

	render({ wallets, authorizations: { appHandle, authUri } }, { text }) {
		return (
			<Container>
				<Card shadow={2}>
			        <a onClick={(e) => this.getWallets(appHandle)}>Load Wallets</a>
					<ul>
						{ wallets.map(wallet => (
							<Wallet key={wallet.id} wallet={wallet} />
						)) }
					</ul>
					<Form onSubmit={(e) => this.submitWallet(e, appHandle)}>
						<h6>Create a public ID</h6>
						<TextField
							floating-label
							value={text}
							onInput={e => this.setState({ text: e.target.value })}
							label='Your public ID'
						/>
						<Button type="Submit">Create</Button>
					</Form>
				</Card>
			</Container>
		);
	}
}
