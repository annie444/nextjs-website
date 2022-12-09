import { useEffect, useState } from 'react';
import anime from 'animejs'
import { GridItem } from './styles'
import React from 'react';

type propsType = {
	columns: number;
	rows: number;
	items: object[];
}

export default function ItemsList(props: propsType): JSX.Element[] {

	const [columns, setColumns] = useState<number>(props.columns);
	const [rows, setRows] = useState<number>(props.rows);

	const clickHandler = (e: any) => {

		const id = e.target.id;

		anime({
			targets: '.grid-item',
			scale: [
				{ value: .1, easing: 'easeOutSine', duration: 500 },
				{ value: 1, easing: 'easeInOutQuad', duration: 1200 }
			],
			delay: anime.stagger(200, { grid: [columns, rows], from: id })
		});
	}

	useEffect(() => {

		setColumns(props.columns);
		setRows(props.rows);

		anime({
			targets: '.grid-item',
			scale: [
				{ value: .1, easing: 'easeOutSine', duration: 500 },
				{ value: 1, easing: 'easeInOutQuad', duration: 1200 }
			],
			delay: anime.stagger(200, { grid: [props.columns, props.rows], from: 'center' })
		});

	}, [props.columns, props.rows]);

	return Array.from(props.items).map((item: any) => (
		<GridItem id={item.id} key={item.i} onClick={clickHandler} style={{ backgroundColor: '#fff' }} className="grid-item"></GridItem>
	));
}
