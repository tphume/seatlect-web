import React, { Component, useState } from 'react';
import { Transformer, Image, Text } from 'react-konva';
import table1 from '../../public/rectangleAvailable2.png';
import table2 from '../../public/square4Available.png';
import useImage from 'use-image';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './sidebar';
import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
const canvasWidth = 0.74;
const canvasHeight = 0.8;

const FreeStyleObject = ({
	shapeProps,
	isSelected,
	onSelect,
	onChange,
	src,
	rotation,
	onDelete
}) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();
	const [img] = useImage(src);
	var imgTest;

	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.nodes([shapeRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	function testhandler(e) {
		console.log(shapeProps);
		console.log(isSelected);
		console.log(onSelect);
		console.log(onChange);
		console.log(shapeRef.current.x());
	}
	// if()
	// if(shapeProps.type == 'table1' || shapeProps.type == 'table2'){
	if (shapeProps.type == 'table1') {
		imgTest = table1;
	}
	if (shapeProps.type == 'table2') {
		imgTest = table2;
	}
	return (
		<React.Fragment>
			<Image
				// onClick={onSelect,popUp}
				// onClick={testhandler}
				onClick={onSelect}
				onTap={onSelect}
				ref={shapeRef}
				image={img}
				rotation={rotation}
				{...shapeProps}
				draggable
				onDragEnd={(e) => {
					var coordinateX = e.target.x();
					var coordinateY = e.target.y();
					if (coordinateX < 0) {
						coordinateX = 0;
					}
					if (coordinateY < 0) {
						coordinateY = 0;
					}
					if (coordinateY > window.innerHeight * canvasHeight - 100) {
						coordinateY = window.innerHeight * canvasHeight - 100;
					}
					if (coordinateX > window.innerWidth * canvasWidth - 100) {
						coordinateX = window.innerWidth * canvasWidth - 110;
					}
					//console.log(coordinateX)
					//console.log(coordinateY)
					onChange({
						...shapeProps,
						x: coordinateX,
						y: coordinateY
					});
				}}
				onTransformEnd={(e) => {
					// transformer is changing scale of the node
					// and NOT its width or height
					// but in the store we have only width and height
					// to match the data better we will reset scale on transform end
					const node = shapeRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();
					const coordinateX = node.x();
					const coordinateY = node.y();
					// we will reset it back
					node.scaleX(1);
					node.scaleY(1);

					onChange({
						...shapeProps,
						x: coordinateX,
						y: coordinateY,
						rotation: node.rotation(),
						// // set minimal value
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(node.height() * scaleY)
						// rotation: node.attrs.rotation,
					});
					// console.log(setImages(<Image/> ))
					console.log(shapeProps);
					console.log(node.attrs.id);
					console.log(node.attrs.rotation);
				}}
				status={false}
			/>

			<Text
				text={shapeProps.name}
				x={shapeProps.x + shapeProps.width / 2.25}
				y={shapeProps.y + (shapeProps.height / 2 - 5)}
				fill="black"
				fillEnabled
				fontSize={15}
				fillLinearGradientColorStops
			/>
			{isSelected && (
				<Transformer
					ref={trRef}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			)}
			{isSelected && (
				<Text
					text="Delete"
					x={shapeProps.x + shapeProps.width + 20}
					y={shapeProps.y + 40}
					fill="black"
					fillEnabled
					fontSize={15}
					fillLinearGradientColorStops
					onClick={() => {
						console.log('Deleted');
						onDelete(shapeProps.id);
					}}
				/>
			)}
		</React.Fragment>
	);
	// }
};

export default FreeStyleObject;
