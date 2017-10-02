import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Grid, Card, Layout } from 'preact-mdl';
import styled from 'styled-components';

import bindActions from '../util';
import reducers from '../reducers';
import { addTodo, removeTodo } from '../actions/todo';
import Assets from './Assets';
import Transactions from './Transactions';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
`;

const assets = [
	{
		name: 'Token 1',
		value: 300,
		address: 'asl192u3!QJLKE1928223339'
	},
	{
		name: 'Token 2',
		value: 877,
		address: 'asl192u3!QJLasdqweKE19289'
	},
	{
		name: 'Token 3',
		value: 15,
		address: 'asl192u3!QJLKE1232928ll9'
	}
];

const transactions = [
	{
		hash: 'aslk!192IW85n2ll!##8ll ',
		type: 'send',
		value: 488
	},
	{
		hash: 'aslk!192IW85n2ll!##8ll ',
		type: 'receive',
		value: 500
	},
	{
		hash: 'aslk!192IW85n2ll!##8ll ',
		type: 'send',
		value: 58
	},
	{
		hash: 'aslk!192IW85n2ll!##8ll ',
		type: 'send',
		value: 2098
	}
];

@connect(reducers, bindActions({ addTodo, removeTodo }))
export default class Dashboard extends Component {
	addTodos = e => {
		e.preventDefault();

		let { text } = this.state;
		this.setState({ text: '' });
		this.props.addTodo(text);
	};

	removeTodo = (todo) => {
		this.props.removeTodo(todo);
	};

	render({ todos }, { text }) {
		return (
			<Container>
				<Card>
					<Transactions transactions={transactions} />
				</Card>
				<Card>
					<Assets assets={assets} />
				</Card>
			</Container>
		);
	}
}
