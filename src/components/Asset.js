import { h } from 'preact';
import { ListItem, Button } from 'preact-mdl';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const Actions = styled.div`
	width: 30%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export default({ name, value, address }) => {
	return (
		<ListItem>
			<Container>
				<h8>{name} - {value}</h8>
				<Actions>
					<Button colored raised>Send</Button>
					<Button colored raised>Receive</Button>
				</Actions>
			</Container>
		</ListItem>
	);
};
