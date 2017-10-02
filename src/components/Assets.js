import { h } from 'preact';
import { List } from 'preact-mdl';
import Asset from './Asset';

export default({ assets }) => {
	return (
		<List>
			<h3>Your assets</h3>
			{assets.map((item) => {
				return <Asset key={item.name} {...item} />;
			})}
		</List>
	);
};
