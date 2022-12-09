import styled from "styled-components";

export const GridItem = styled.div`
	min-width: 100%;
	min-height: 100%;
	cursor: pointer;
	position: relative;
	z-index: 1;

	& :hover {
		opacity: 0.8;
	}
`;
