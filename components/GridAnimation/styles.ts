import styled from "styled-components";

export const GridContainer = styled.div<{ columns: number, rows: number }>`
	width: 100vw;
	height: 100vh;
	display: grid;
	position: fixed;
	grid-template-columns: repeat(${(props) => (props.columns)}, minmax(50px, 1fr));
	grid-template-rows: repeat(${(props) => (props.rows)}, minmax(50px, 1fr));
	grid-gap: 1px;
	align-content: center;
	z-index: 1;
	background-color: transparent;
	justify-content: center;
`;
