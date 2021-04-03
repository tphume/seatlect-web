import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Transformer, Image, Text, Circle, Label } from 'react-konva';

import Layout from 'src/components/layout';

import makeStyles from '@material-ui/core/styles/makeStyles'

// import table1 from '../../public/rectangleAvailable.png';
// import table2 from '../../public/square4Available.png';
// import wall1 from '../../public/wall1.png';
// import wall2 from '../../public/wall2.png';
// import object1 from '../../public/object1.png';
// import object2 from '../../public/object2.png';
import useImage from 'use-image';

// import { Button, InputGroup, FormControl } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Sidebar from './sidebar';

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

const useStyles = makeStyles((theme) => ({
	label: {
		color: `rgba(0, 0, 0, 0.87)`,
		fontWeight: `700`,
		fontSize: `0.75rem`,
		margin: '0 0 3px 0'
	},
	textField: {
		margin: `0 0 1.2rem 0`
	},
	selectField: {
		'&.MuiSelect-root, &.Mui-disabled': {
			margin: `0 0 1.2rem 0`
		}
	},
	mapContainer: {
		width: `100%`,
		height: `300px`,
		margin: `0 0 1.2rem 0`
	},
	displayCard: {
		display: `flex`,
		margin: `0.8rem auto 1.2rem auto`
	},
	displayImage: {
		width: `300px`
	},
	test: {
		display: `flex`
	},
	canvas: {
		marginLeft: `1vw`,
		width: CSS_canvasWidth
	},
	sidebar: {
		width: `25vw`,
		height: CSS_SidebarHeight,
		backgroundColor: `#E5E5E5`,
		display: `inline`
	},
	headerSidebar: {
		fontSize: `1.5rem`
	},
	inputGroup: {
		padding: `10px`
	},
	inputGroup_Text: {
		display: `inline`,
		width: `6rem`
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
		height: `110px`
	},
	sliderBar: {
		display: `none`
	},
	navLink: {
		width: `60%`,
		display: `flex`,
		justifyContent: `space-around`,
		alignItems: `center`,
		listStyle: `none`
	},
	link: {
		color: `white`
	}
}));

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: TABLE_Width,
    height: TABLE_Height,
    guest: 4,
    src: '/square4Available.png',
    alt: 'table2',
    type: 'table2',
    name: 'rect1',
    id: 'rect1',
    rotation: 0,
  },
  {
    x: 150,
    y: 150,
    width: TABLE_Width,
    height: TABLE_Height,
    guest: 4,
    src: '/rectangleAvailable.png',
    type: 'table1',
    alt: 'table1',
    id: '999',
    name: '999',
    rotation: 0,
  },
];

const initialObjects = [];
const initialWalls = [];

// function simulateNetworkRequest() {
//   return new Promise((resolve) => setTimeout(resolve, 2000));
// }

// function SavingButton() {
//   const [isLoading, setLoading] = useState(false);

//   React.useEffect(() => {
//     if (isLoading) {
//       simulateNetworkRequest().then(() => {
//         setLoading(false);
//       });
//     }
//   }, [isLoading]);

//   const handleClick = () => setLoading(true);

//   return (
//     <Button
//       variant="primary"
//       disabled={isLoading}
//       onClick={!isLoading ? handleClick : null}
//     >
//       {isLoading ? 'saving…' : 'save'}
//     </Button>
//   );
// }

export default function Placement() {
	// INITIAL_SETUP
	const classes = useStyles();

	// SET_STATE
	const [id, setId] = useState('');
	const [images,setImages] = useState(initialRectangles);
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
	const tableId = React.useRef(0);
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
							alt="wall1"
							src="/wall1.png"
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
							alt="wall2"
							src="/wall2.png"
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
							alt="table2"
							src="/square4Available.png"
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
							alt="table1"
							src="/rectangleAvailable.png"
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
							alt="object1"
							src="/object1.png"
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
							alt="object2"
							src="/object2.png"
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
						stageRef.current.setPointersPositions(e);
						// ADD RESERVABLE object into list of table
						console.log(dragObject.current)
						if(dragObject.current=="table1"||dragObject.current=="table2"){
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
									guest: 1,
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
									height: 100,
									id: tableId.current,
									name: "",
									// guest: 1,
									// price: 100,
									// id: tableId.current,
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

				{/*  */}
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

									
									//onDrop={}
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
								if(newAttrs.type == 'table1' || newAttrs.type == 'table2'){
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
								if(selectShape.type == 'table1' || selectShape.type == 'table2'){
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
			</div>
		</Layout>
	);

	//     <div className={classes.sidebar}>
	//       <Sidebar
	//         shapeProps = {selectedShape}
	//         onChangeSidebar={(newAttrs) => {
	//           console.log('newAettrs')
	//           console.log(newAttrs)
	//           if(newAttrs.type == 'table1' || newAttrs.type == 'table2'){
	//             const rects = images.slice();
	//             var i = indexOfImage.current
	//             console.log(rects)
	//             rects[i] = newAttrs;
	//             setImages(rects);
	//             console.log(rects)
	//           }
	//           else{
	//             const rects = objects.slice();
	//             var i = indexOfImage.current
	//             console.log(rects)
	//             rects[i] = newAttrs;
	//             setObject(rects);
	//             console.log(rects)
	//           }
	//       }}
	//         onDelete={(newAttrs) => {
	//           setImages(images.filter(img => img.id !== newAttrs));
	//           if(selectShape.type == 'table1' || selectShape.type == 'table2'){
	//             setImages(images.filter(img => img.id !== newAttrs));
	//           }
	//           else{
	//             setObject(objects.filter(obj => obj.id !== newAttrs));
	//           }
	//         }}
	//       />

	//     </div>
	//   </div>
	//   <div><SavingButton /></div>
	// </div>
	// );
}
