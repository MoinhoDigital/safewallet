import { h } from 'preact';
import { Button } from 'preact-mdl';

export default({ wallet }) => {
	return (
		<li>
			{ ' ' + wallet.text }
		</li>
	);
};
