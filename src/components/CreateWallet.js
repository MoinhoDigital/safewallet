import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';
import { TextField, Card, Layout, Container } from 'preact-mdl';
import styled from 'styled-components';

import bindActions from '../util';
import reducers from '../reducers';
import { createWallet } from '../actions/wallet';
import Wallet from './Wallet';

const Form = styled.form`
	align-text: center;
`;

@connect(reducers, bindActions({ createWallet }))
export default class CreateWallet extends Component {
	submitWallet = (e, app) => {
		e.preventDefault();
		// const { appHandle } = this.props;
		const { text } = this.state;
		this.setState({ text: '' });
		console.log('app', app);
		this.props.createWallet(app, text);
	};

	render({ wallets, authorizations: { appHandle, authUri } }, { text }) {
		console.log('this.props', this.props);
		console.log('App', appHandle);
		console.log('wallets...', wallets);
		if(!appHandle || !authUri) {
			console.log('Not auth', appHandle, authUri);
			route('/', true);
		}
		return (
			<Container>
				<Card shadow={2}>
					<Form onSubmit={(e) => this.submitWallet(e, appHandle)}>
						<TextField
							floating-label
							value={text}
							onInput={e => this.setState({ text: e.target.value })}
							label='Insert your wallet name'
						/>
					</Form>
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
