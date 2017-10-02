import { h } from 'preact';
import { List } from 'preact-mdl';
import Transaction from './Transaction';

export default({ transactions }) => {
	return (
		<List>
			<h3>Your last transactions</h3>
			{transactions.map((item) => {
				return <Transaction key={item.name} {...item} />;
			})}
		</List>
	);
};
