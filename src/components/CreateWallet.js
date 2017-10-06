import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { TextField, Card, Layout, Container } from 'preact-mdl';

import bindActions from '../util';
import reducers from '../reducers';
import { createWallet } from '../actions/wallet';
import Wallet from './Wallet';

@connect(reducers, bindActions({ createWallet }))
export default class CreateWallet extends Component {
	submitWallet = e => {
		e.preventDefault();

		let { text } = this.state;
		this.setState({ text: '' });
		this.props.createWallet(text);
	};

	render({ wallets }, { text }) {
		console.log('aqui...');
		return (
			<Container>
				<Card shadow={2}>
					<form onSubmit={this.submitWallet}>
						<TextField
							floating-label
							value={text}
							onInput={e => this.setState({ text: e.target.value })}
							label='Insert your wallet name'
						/>
					</form>
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
