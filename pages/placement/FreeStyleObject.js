import React, { Component, useState } from 'react';
import { Transformer, Image, Text } from 'react-konva';
import useImage from 'use-image';

const canvasHeight = 800;
const canvasWidth = 800;

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

	function testhandler() {}
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
					if (coordinateY > canvasHeight - shapeProps.height) {
						coordinateY = canvasHeight - shapeProps.height;
					}
					if (coordinateX > canvasWidth - shapeProps.width) {
						coordinateX = canvasWidth - shapeProps.width;
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
					// console.log(shapeProps);
					// console.log(node.attrs.id);
					// console.log(node.attrs.rotation);
				}}
				status={false}
			/>
			{/* shapeProps.name */}
			<Text
				text={shapeProps.name}
				x={shapeProps.x + shapeProps.width / 2.25 - (shapeProps.name.length / 2) * 4}
				y={shapeProps.y + (shapeProps.height / 2 - 5) - 2}
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
			{/* <h1>FreeStyleObject</h1> */}
		</React.Fragment>
	);
};

export default FreeStyleObject;
