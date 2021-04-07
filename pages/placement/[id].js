import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect, Transformer, Image, Text, Circle, Label } from 'react-konva';

import Layout from 'src/components/layout';
import makeStyles from '@material-ui/core/styles/makeStyles'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import useImage from 'use-image';

import Rectangle from './Rectangle';
import FreeStyleObject from './FreeStyleObject';
import Sidebar from './sidebar';

// pre-define number
const CSS_canvasWidth = `800px`
const CSS_SidebarHeight = `802px`
const canvasWidth = 800;
const canvasHeight = 800;
const TABLE_Height = 80;
const TABLE_Width = 80;
const LONG_TABLE_Width=120;
const WALL_Width = 13;
const WALL_Height = 80;
const OBJ_Width = 80;
const OBJ_Height = 80;

// pre-define type
const WALL1 = 'BLUE_WALL'
const WALL2 = 'BROWN_WALL'
const OBJ1 = 'OBJECT_CIRCLE'
const OBJ2 = 'OBJECT_SQUARE'
const TABLE1 = 'SHORT_TABLE' 
const TABLE2 = 'TABLE'
const TABLE3 = 'LONG_TABLE'

const useStyles = makeStyles((theme) => ({
	label: {
		color: `rgba(0, 0, 0, 0.87)`,
		fontWeight: `700`,
		fontSize: `0.75rem`,
		margin: '0 0 3px 0'
	},
	test: {
		display: `flex`
	},
	canvas: {
		marginLeft: `0vw`,
		width: CSS_canvasWidth
	},
	sidebar: {
		width: `28vw`,
		height: CSS_SidebarHeight,
		backgroundColor: `#E5E5E5`,
		display: `inline`
	},
	category: {
		display: `flex`,
		alignItems: `center`
	},
	headSlider: {
		width: `25vw`,
		height: `2.5rem`,
		display: `block`,
		justifyContent: `center`,
		borderTopLeftRadius: `20px`,
		borderTopRightRadius: `20px`,
		backgroundColor: `#E5E5E5`
	},
	headSliderSelected: {
		width: `30vw`,
		height: `2.5rem`,
		borderTopLeftRadius: `20px`,
		borderTopRightRadius: `20px`,
		backgroundColor: `#5D55B4`,
		color: `white`,
		display: `block`
	},
	center: {
		display: `flex`,
		justifyContent: `center`,
		lineHeight: `3rem`
	},
	sliderBarSelected: {
		display: `flex`,
		justifyContent: `space-evenly`,
		paddingLeft: `20%`,
		paddingRight: `20%`,
		paddingTop: `10px`,
		height: `110px`,
		border: `1px solid grey`
	},
	sliderBar: {
		display: `none`
	},

}));
var initialID = 0

const initialTable = [
  // {
  //   x: 10,
  //   y: 10,
  //   width: TABLE_Width,
  //   height: TABLE_Height,
  //   space: 4,
  //   src: '/LONG_TABLE.png',
  //   alt: TABLE3,
  //   type: TABLE3,
  //   name: 'rect1',
  //   id: 'rect1',
  //   rotation: 0,
  // },
  // {
  //   x: 150,
  //   y: 150,
  //   width: TABLE_Width,
  //   height: TABLE_Height,
  //   space: 4,
  //   src: '/TABLE.png',
  //   type: TABLE2,
  //   alt: TABLE2,
  //   id: '999',
  //   name: '999',
  //   rotation: 0,
  // },
];
const initialObjects = [];
const initialWalls = [];

// fetching data from server
function fetching() {
	// GET seats
	
		// data = fetching()
	
	//handle data
	var i;
	for(i=0;i<data.seat.length;i++){
		if(data.seat[i].type == TABLE1 || data.seat[i].type == TABLE2 || data.seat[i].type == TABLE3){
			var _src = '/'+data.seat[i].type+'.png'
			initialTable.push({
				...data.seat[i],
				alt: data.seat[i].type,
				id: initialID,
				src: _src
			})
		}else if(data.seat[i].type == WALL1 || data.seat[i].type == WALL2){
			var _src = '/'+data.seat[i].type+'.png'
			initialWalls.push({
				...data.seat[i],
				alt: data.seat[i].type,
				id: initialID,
				src: _src
			})
		}else{
			var _src = '/'+data.seat[i].type+'.png'
			initialObjects.push({
				...data.seat[i],
				alt: data.seat[i].type,
				id: initialID,
				src: _src
			})
		}
		initialID += 1
	}
	
}

export default function Placement() {
	// INITIAL_SETUP
	const classes = useStyles();

	// SET_STATE
	const [id, setId] = useState('');
	const [images,setImages] = useState(initialTable);
	const [objects, setObject] = useState(initialObjects);
	const [walls, setWall] = useState(initialWalls);
	const [selectedId, selectShape] = useState(null);
	const [selectedShape, setShape] = useState(null);
	const [activeIndex,Setheader]= useState(null);
	
	// LOCAL REFERANCE
	const dragUrl = React.useRef();
	const indexOfImage = React.useRef();
	const dragObject = React.useRef();
	const dragWidth = React.useRef();
	const dragHeight = React.useRef();
	const stageRef = React.useRef();
	const tableId = React.useRef(initialID);
	const startDragId = React.useState();

	// FUNCTION

	const checkDeselect = (e) => {
	  // deselect when clicked on empty area
		const clickedOnEmpty = e.target === e.target.getStage();
		if (clickedOnEmpty) {
			selectShape(null);
			setShape(null);
		}
	};
	useEffect(() => setId(localStorage.getItem('_id')), []);

	function simulateNetworkRequest() {
		return new Promise((resolve) => {
			setTimeout(resolve, 2000)
			var data = {
				width: canvasWidth,
				height: canvasHeight,
				seat: [
				]
			}

			images.map((object, i) => {
				data.seat.push({
					name: object.name,
					floor: object.floor,
					type: object.type,
					space: object.space,
					x: object.x,
					y: object.y,
					width: object.width,
					height: object.height,
					rotation: object.rotation
				})
			})
			objects.map((object, i) => {
				data.seat.push({
					name: object.name,
					floor: object.floor,
					type: object.type,
					space: object.space,
					x: object.x,
					y: object.y,
					width: object.width,
					height: object.height,
					rotation: object.rotation
				})
			})
			console.log(data)
		});
	}
	
	function SavingButton() {
		// set Loading status
		const [isLoading, setLoading] = useState(false);
		// saving
		React.useEffect(() => {
			if (isLoading) {
				simulateNetworkRequest().then(() => {
					setLoading(false);
				});
			}
		}, [isLoading]);
		// click handler 
		const handleClick = () => setLoading(true);
		// Button HTML
		return (
			<Button
				variant="contained"
				color="primary"
				disabled={isLoading}
				size="large"
				onClick={!isLoading ? handleClick : null}
			>
				{isLoading ? <CircularProgress size={24}></CircularProgress> : ''}
				{isLoading ? 'saving…' : 'save'}
			</Button>
		);
	}

	//
	return (
		<Layout id={id}>
			<h1>Placement</h1>
			<div>
				{/* --- Start Drag Drop header section --- */}
				<div className={classes.category}>
					<div id="wallComponent" className={classes.headSliderSelected} onClick={ () => {
						document.getElementById('wallComponent').className=classes.headSliderSelected
						document.getElementById('tableComponent').className=classes.headSlider
						document.getElementById('objectComponent').className=classes.headSlider
						document.getElementById('slider1').className=classes.sliderBarSelected
						document.getElementById('slider2').className=classes.sliderBar
						document.getElementById('slider3').className=classes.sliderBar
					}}>
						<div className={classes.center}>Wall</div>
					</div>
					<div id="tableComponent"className={classes.headSlider} onClick={ () => {
						document.getElementById('wallComponent').className=classes.headSlider
						document.getElementById('tableComponent').className=classes.headSliderSelected
						document.getElementById('objectComponent').className=classes.headSlider
						document.getElementById('slider1').className=classes.sliderBar
						document.getElementById('slider2').className=classes.sliderBarSelected
						document.getElementById('slider3').className=classes.sliderBar
					}}>
						<div className={classes.center}>Table</div>
					</div>
					<div id="objectComponent" className={classes.headSlider} onClick={ () => {
						document.getElementById('wallComponent').className=classes.headSlider
						document.getElementById('tableComponent').className=classes.headSlider
						document.getElementById('objectComponent').className=classes.headSliderSelected
						document.getElementById('slider1').className=classes.sliderBar
						document.getElementById('slider2').className=classes.sliderBar
						document.getElementById('slider3').className=classes.sliderBarSelected
					}}>
						<div className={classes.center}>Object</div>
					</div>
				</div>
				{/* --- End of Drag Drop header section --- */}

				{/* --- Start Drag Drop Body section ---  */}
				<div>
					{/* BODY_1 : Wall image drag & drop */}
					<div id="slider1" className={classes.sliderBarSelected} >
						<img
							alt={WALL1}
							src="/BLUE_WALL.png"
							draggable="true"
							width={WALL_Width}
							height={WALL_Height}
							onDragStart={e => {
								dragUrl.current = e.target.src;
								dragObject.current = e.target.alt
								dragWidth.current = e.target.width
								dragHeight.current = e.target.height
							// DEBUG : Target wrong info
								// console.log(e.target)
							}}
						/>
						{/* <div style={{width:100, height:100}}></div> */}
						<img
							alt={WALL2}
							src="/BROWN_WALL.png"
							draggable="true"
							width={WALL_Width}
							height={WALL_Height}
							onDragStart={e => {
								dragUrl.current = e.target.src;
								dragObject.current = e.target.alt
								dragWidth.current = e.target.width
								dragHeight.current = e.target.height
							// DEBUG : Target wrong info
								// console.log(e.target)
							}}
						/>
					</div>

					{/* BODY_2 : Reservable/Table image drag & drop */}
					<div id="slider2" className={classes.sliderBar} >
					<img
							alt={TABLE1}
							src="/SHORT_TABLE.png"
							draggable="true"
							width={TABLE_Width}
							height={TABLE_Height}
							onDragStart={e => {
								dragUrl.current = e.target.src;
								dragObject.current = e.target.alt
								dragWidth.current = e.target.width
								dragHeight.current = e.target.height
							}}
						/>
					<img
						alt={TABLE2}
						src="/TABLE.png"
						draggable="true"
						width={TABLE_Width}
						height={TABLE_Height}
						onDragStart={e => {
							dragUrl.current = e.target.src;
							dragObject.current = e.target.alt
							dragWidth.current = e.target.width
							dragHeight.current = e.target.height
						}}
					/>
						<img
							alt={TABLE3}
							src="/LONG_TABLE.png"
							draggable="true"
							width={LONG_TABLE_Width}
							height={TABLE_Height}
							onDragStart={e => {
								dragUrl.current = e.target.src;
								dragObject.current = e.target.alt
								dragWidth.current = e.target.width
								dragHeight.current = e.target.height
							// DEBUG : Target wrong info	
								// console.log(e.target)
							}}
						/>
					</div>

					{/* BODY_3 : OTHER_Object image drag & drop */}
					<div id="slider3" className={classes.sliderBar} >
						<img
							alt={OBJ1}
							src="/OBJECT_CIRCLE.png"
							draggable="true"
							width={OBJ_Width}
							height={OBJ_Height}
							onDragStart={e => {
								dragUrl.current = e.target.src;
								dragObject.current = e.target.alt
								dragWidth.current = e.target.width
								dragHeight.current = e.target.height
							// DEBUG : Target wrong info
								// console.log(e.target)
							}}
						/>
						<img
							alt={OBJ2}
							src="/OBJECT_SQUARE.png"
							draggable="true"
							width={OBJ_Width}
							height={OBJ_Height}
							onDragStart={e => {
								dragUrl.current = e.target.src;
								dragObject.current = e.target.alt
								dragWidth.current = e.target.width
								dragHeight.current = e.target.height
							// DEBUG : Target wrong info
								// console.log(e.target)
							}}
						/>
					</div>
				</div>
				{/* --- End Drag Drop Body section  ---  */}
				{/* ----------------------------------------------------------------------------------- */}
				{/* --- Start Canvas section ---  */}
				<div
					onDrop={e => {
						// DECLARE onDrop() Action - add new object to the list
						// table -> [images, setImage]
						// wall or object -> [object, setObject]
						// register event position
						e.preventDefault()
						stageRef.current.setPointersPositions(e);
						// ADD RESERVABLE object into list of table
						console.log(dragObject.current)
						if(dragObject.current==TABLE1||dragObject.current==TABLE2||dragObject.current==TABLE3){
						setImages(
							images.concat([
								{
									...stageRef.current.getPointerPosition(),
									src: dragUrl.current,
									type: dragObject.current,
									width: dragWidth.current,
									height: dragHeight.current,
									id: tableId.current,
									name: "",
									space: 1,
									floor: 0,
									rotation: 0,
								}
							])
						);
						tableId.current += 1
					}
					// ADD OTHER object into the list of objects
					else{
						setObject(
							objects.concat([
								{
									...stageRef.current.getPointerPosition(),
									src: dragUrl.current,
									type: dragObject.current,
									width: dragWidth.current,
									height: dragHeight.current,
									id: tableId.current,
									name: "",
									space: 0,
									floor: 0,
									rotation: 0,
								}
							])
						);
						tableId.current += 1
					}

					}}
					onDragOver={e => e.preventDefault()}
					onClick={e => {
						console.log(images)
						console.log(objects)
					}}
					className={classes.test}
				>

				{/* --- creating canvas --- */}
				<div className={classes.canvas}>
					<Stage
						width={canvasWidth}
						height={canvasHeight}
						style={{ border: '1px solid grey' }}
						ref={stageRef}
						onMouseDown={checkDeselect}
						onTouchStart={checkDeselect}
					>
						<Layer>
							{images.map((rect, i) => {
							return (
								<Rectangle
									key={i}
									image={rect.src}
									shapeProps={rect}
									isSelected={rect.id === selectedId}
									src={rect.src}
									type={rect.alt}
									onSelect={() => {
										setShape()
										selectShape(rect.id);
										setShape(rect)
										indexOfImage.current = i
										console.log(indexOfImage)
										console.log(selectedId)
										console.log(rect)
									}}
									onChange={(newAttrs) => {
										const rects = images.slice();
										rects[i] = newAttrs;
										setImages(rects);
									}}
									
									onDelete={(newAttrs) => {
										setImages(images.filter(img => img.id !== newAttrs));
									}}
									rotation={rect.rotation}
								></Rectangle>
							);
						})}

						{objects.map((object, i) => {
							return (
								<FreeStyleObject
									key={i}
									image={object.src}
									shapeProps={object}
									isSelected={object.id === selectedId}
									src={object.src}
									type={object.alt}
									onSelect={() => {
										setShape()
										selectShape(object.id);
										setShape(object)
										indexOfImage.current = i
										console.log(indexOfImage)
										console.log(selectedId)
										console.log(object)
									}}
									onChange={(newAttrs) => {
										const rects = objects.slice();
										rects[i] = newAttrs;
										setObject(rects);
									}}
									onDelete={(newAttrs) => {
										setObject(objects.filter(obj => obj.id !== newAttrs));
									}}
									//onDrop={}
									rotation={object.rotation}
								></FreeStyleObject>
							);
						})}
						</Layer>
					</Stage>
					</div>
					{/* --- End of Canvas section ---  */}
					{/* _______________________________________________________________________________________________ */}
					{/* --- Start of Sidebar section ---  */}
					<div className={classes.sidebar}>
						<Sidebar 
							shapeProps = {selectedShape}
							onChangeSidebar={(newAttrs) => {
								console.log('newAettrs')
								console.log(newAttrs)
								if(newAttrs.type == TABLE1 || newAttrs.type == TABLE2|| newAttrs.type == TABLE3){
									const rects = images.slice();
									var i = indexOfImage.current
									console.log(rects)
									rects[i] = newAttrs;
									setImages(rects);
									console.log(rects)
								}
								else{
									const rects = objects.slice();
									var i = indexOfImage.current
									console.log(rects)
									rects[i] = newAttrs;
									setObject(rects);
									console.log(rects)
								}
						}}
							onDelete={(newAttrs) => {
								setImages(images.filter(img => img.id !== newAttrs));
								if(selectShape.type == TABLE1 || selectShape.type == TABLE2 || selectShape.type == TABLE3 ){
									setImages(images.filter(img => img.id !== newAttrs));
								}
								else{
									setObject(objects.filter(obj => obj.id !== newAttrs));
								}
								setShape()
							}}
						/>
					</div>
				</div>
				{/* --- End Canvas section ---  */}
				{/* --- Start of Save Button --- */}
				<div className={classes.center}>
					<SavingButton />
				</div>
				{/* --- End of Save Button --- */}
			</div>
		</Layout>
	);
}
