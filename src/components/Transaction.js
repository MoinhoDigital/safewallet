import { h } from 'preact';
import { ListItem, Button } from 'preact-mdl';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const Receive = styled.div`
	color: green;
`;

const Send = styled.div`
color: red;
`;

const Actions = styled.div`
	width: 30%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

export default({ address, value, type }) => {
	return (
		<ListItem>
			<Container>
				{(type === 'receive') && <Receive>+ {value}</Receive>}
				{(type === 'send') && <Send>- {value}</Send>}
				<Actions>
					<Button colored raised>View</Button>
				</Actions>
			</Container>
		</ListItem>
	);
};
