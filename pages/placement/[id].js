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
// import FreeStyleObject from './FreeStyleObject';

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
		width: 300
	},
	test: {
		display: flex
	},
	canvas: {
		marginLeft: `1vw`,
		width: `74vw`
	},
	sidebar: {
		width: `25vw`,
		height: `80vh`,
		backgroundColor: `#E5E5E5`,
		display: `inline`
	},
	headerSidebar: {
		fontSize: `1.5rem`
	},
	inputGroup: {
		padding: `10px`
	},
	inputGroup,
	text: {
		display: inline,
		width: `6rem`
	},
	category: {
		display: flex,
		alignItems: center
	},
	headSlider: {
		width: `30vw`,
		height: `2.5rem`,
		display: block,
		justifyContent: center,
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
		color: white,
		display: block
	},
	center: {
		display: flex,
		justifyContent: center,
		lineHeight: `3rem`
	},
	sliderBarSelected: {
		display: flex,
		justifyContent: space - evenly,
		paddingLeft: `20%`,
		paddingRight: `20%`,
		paddingTop: `10px`,
		height: `110px`
	},
	sliderBar: {
		display: none
	},
	navLink: {
		width: `60%`,
		display: flex,
		justifyContent: `space-around`,
		alignItems: center,
		listStyle: none
	},
	link: {
		color: white
	}
}));

const canvasWidth = 0.74;
const canvasHeight = 0.8;

// const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, src, rotation, onDelete}) => {
//   const shapeRef = React.useRef();
//   const trRef = React.useRef();
//   const [img] = useImage(src);

//   React.useEffect(() => {
//     if (isSelected) {
//       // we need to attach transformer manually
//       trRef.current.nodes([shapeRef.current]);
//       trRef.current.getLayer().batchDraw();
//     }
//   }, [isSelected]);

//   function testhandler(e){
//     console.log(shapeProps)
//     console.log(isSelected)
//     console.log(onSelect)
//     console.log(onChange)
//   }
//     if(shapeProps.type == 'table1'){imgTest = table1}
//     if(shapeProps.type == 'table2'){imgTest = table2}
//     return (
//       <React.Fragment>
//         <Image
//           // onClick={onSelect,popUp}
//           // onClick={testhandler}
//           onClick={onSelect}
//           onTap={onSelect}
//           ref={shapeRef}
//           image={img}
//           rotation={rotation}
//           {...shapeProps}
//           draggable
//           onDragEnd={(e) => {
//             var coordinateX = e.target.x();
//             var coordinateY = e.target.y();
//             if(coordinateX < 0){
//               coordinateX = 0
//             }
//             if(coordinateY < 0){
//               coordinateY = 0
//             }
//             if(coordinateY > window.innerHeight*canvasHeight-100){
//               coordinateY = window.innerHeight*canvasHeight-100
//             }
//             if(coordinateX > window.innerWidth*canvasWidth-100){
//               coordinateX = window.innerWidth*canvasWidth-110
//             }
//             onChange({
//               ...shapeProps,
//               x: coordinateX,
//               y: coordinateY,
//             });
//           }}
//           onTransformEnd={(e) => {
//             // transformer is changing scale of the node
//             // and NOT its width or height
//             // but in the store we have only width and height
//             // to match the data better we will reset scale on transform end
//             const node = shapeRef.current;
//             const scaleX = node.scaleX();
//             const scaleY = node.scaleY();
//             const coordinateX = node.x();
//             const coordinateY = node.y();
//             // we will reset it back
//             node.scaleX(1);
//             node.scaleY(1);

//             onChange({
//               ...shapeProps,
//               x: coordinateX,
//               y: coordinateY,
//               rotation: node.rotation(),
//               // // set minimal value
//               // width: Math.max(5, node.width() * scaleX),
//               // height: Math.max(node.height() * scaleY),
//               // rotation: node.attrs.rotation,
//             });
//             // console.log(setImages(<Image/> ))
//             console.log(shapeProps)
//             console.log(node.attrs.id)
//             console.log(node.attrs.rotation)
//           }}
//           status={false}
//         />

//         <Text text={shapeProps.name} x={shapeProps.x+(shapeProps.width/2.25)} y={shapeProps.y+(shapeProps.height/2-5)}  fill="black" fillEnabled fontSize={15}
//               fillLinearGradientColorStops
//         />
//         {isSelected && (
//           <Transformer
//             ref={trRef}
//             boundBoxFunc={(oldBox, newBox) => {
//               // limit resize
//               if (newBox.width < 5 || newBox.height < 5) {
//                 // console.log(trRef)
//                 // console.log(oldBox)
//                 return oldBox;
//               }
//               // console.log(trRef)
//               // console.log(newBox)
//               return newBox;
//             }}
//           />
//         )}
//         {
//           isSelected && (
//             <Text text="Delete" x={shapeProps.x+shapeProps.width+20} y={shapeRef.current.y()+40}  fill="black" fillEnabled fontSize={15}
//               fillLinearGradientColorStops
//               onClick={ () => {
//                 console.log("Deleted");
//                 console.log(shapeProps.id)
//                 console.log(shapeProps.width)
//                 onDelete(shapeProps.id)
//               }
//             }/>
//           )
//         }
//       </React.Fragment>
//     );
// };

// const initialRectangles = [
//   {
//     x: 10,
//     y: 10,
//     width: 90,
//     height: 90,
//     guest: 4,
//     src: table2,
//     alt: 'table2',
//     type: 'table2',
//     name: 'rect1',
//     id: 'rect1',
//     rotation: 0,
//   },
//   {
//     x: 150,
//     y: 150,
//     width: 90,
//     height: 90,
//     guest: 4,
//     src: table1,
//     type: 'table1',
//     alt: 'table1',
//     id: '999',
//     name: '999',
//     rotation: 0,
//   },
// ];
// const initialObjects = [];
// const initialWalls = [];

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
	const [id, setId] = useState('');

	useEffect(() => setId(localStorage.getItem('_id')), []);

	return (
		<Layout id={id}>
			<h1>Placement</h1>
		</Layout>
	);
	// const [images, setImages] = useState(initialRectangles);
	// const [objects, setObject] = useState(initialObjects);
	// const [walls, setWall] = useState(initialWalls);
	// const [selectedId, selectShape] = useState(null);
	// const [selectedShape, setShape] = useState(null);
	// const dragUrl = React.useRef();
	// const indexOfImage = React.useRef();
	// const dragObject = React.useRef();
	// const dragWidth = React.useRef();
	// const dragHeight = React.useRef();
	// const stageRef = React.useRef();
	// const tableId = React.useRef(0);
	// const startDragId = React.useState();

	// const checkDeselect = (e) => {
	//   // deselect when clicked on empty area
	//   const clickedOnEmpty = e.target === e.target.getStage();
	//   if (clickedOnEmpty) {
	//     selectShape(null);
	//     setShape(null);
	//   }
	// };

	// const [activeIndex,Setheader]= useState(null);

	// return (
	// <div>
	//   <div className={classes.category}>

	//     <div id="wallComponent" className={classes.headSliderSelected} onClick={ () => {
	//       document.getElementById('wallComponent').className= classes.headSliderSelected
	//       document.getElementById('tableComponent').className= classes.headSlider
	//       document.getElementById('objectComponent').className= classes.headSlider
	//       document.getElementById('slider1').className= classes.sliderBarSelected
	//       document.getElementById('slider2').className= classes.sliderBar
	//       document.getElementById('slider3').className= classes.sliderBar
	//     }}>
	//       <div className={classes.center}>Wall</div>
	//     </div>
	//     <div id="tableComponent"className={classes.headSlider} onClick={ () => {
	//       document.getElementById('wallComponent').className= classes.headSlider
	//       document.getElementById('tableComponent').className= classes.headSliderSelected
	//       document.getElementById('objectComponent').className= classes.headSlider
	//       document.getElementById('slider1').className= classes.sliderBar
	//       document.getElementById('slider2').className= classes.sliderBarSelected
	//       document.getElementById('slider3').className= classes.sliderBar
	//     }}>
	//       <div className={classes.center}>Table</div>
	//     </div>
	//   <div id="objectComponent" className={classes.headSlider} onClick={ () => {
	//       document.getElementById('wallComponent').className= classes.headSlider
	//       document.getElementById('tableComponent').className= styles.headSlider
	//       document.getElementById('objectComponent').className= classes.headSliderSelected
	//       document.getElementById('slider1').className= classes.sliderBar
	//       document.getElementById('slider2').className= classes.sliderBar
	//       document.getElementById('slider3').className= classes.sliderBarSelected
	//     }}>
	//       <div className={classes.center}>Object</div>
	//     </div>
	//   </div>
	//   <div>
	//     <div id="slider1" className={classes.sliderBarSelected} >
	//       <img
	//         alt="wall1"
	//         src={wall1}
	//         draggable="true"
	//         width={15}
	//         height={90}
	//         onDragStart={e => {
	//           dragUrl.current = e.target.src;
	//           dragObject.current = e.target.alt
	//           dragWidth.current = e.target.width
	//           dragHeight.current = e.target.height
	//           // console.log(e.target)
	//         }}
	//       />
	//       {/* <div style={{width:100, height:100}}></div> */}
	//       <img
	//         alt="wall2"
	//         src={wall2}
	//         draggable="true"
	//         width={15}
	//         height={90}
	//         onDragStart={e => {
	//           dragUrl.current = e.target.src;
	//           dragObject.current = e.target.alt
	//           dragWidth.current = e.target.width
	//           dragHeight.current = e.target.height
	//           // console.log(e.target)
	//         }}
	//       />
	//     </div>
	//     <div id="slider2" className={classes.sliderBar} >
	//       <img
	//         alt="table2"
	//         src={table2}
	//         draggable="true"
	//         width={80}
	//         height={80}
	//         onDragStart={e => {
	//           dragUrl.current = e.target.src;
	//           dragObject.current = e.target.alt
	//           dragWidth.current = e.target.width
	//           dragHeight.current = e.target.height
	//         }}
	//       />
	//       <img
	//         alt="table1"
	//         src={table1}
	//         draggable="true"
	//         width={120}
	//         height={80}
	//         onDragStart={e => {
	//           dragUrl.current = e.target.src;
	//           dragObject.current = e.target.alt
	//           dragWidth.current = e.target.width
	//           dragHeight.current = e.target.height
	//           // console.log(e.target)
	//         }}
	//       />
	//     </div>
	//     <div id="slider3" className={classes.sliderBar} >
	//       <img
	//         alt="object1"
	//         src={object1}
	//         draggable="true"
	//         width={90}
	//         height={90}
	//         onDragStart={e => {
	//           dragUrl.current = e.target.src;
	//           dragObject.current = e.target.alt
	//           dragWidth.current = e.target.width
	//           dragHeight.current = e.target.height
	//           // console.log(e.target)
	//         }}
	//       />
	//       <img
	//         alt="object2"
	//         src={object2}
	//         draggable="true"
	//         width={90}
	//         height={90}
	//         onDragStart={e => {
	//           dragUrl.current = e.target.src;
	//           dragObject.current = e.target.alt
	//           dragWidth.current = e.target.width
	//           dragHeight.current = e.target.height
	//           // console.log(e.target)
	//         }}
	//       />
	//     </div>
	//   </div>
	//   <div
	//     onDrop={e => {
	//       // register event position
	//       stageRef.current.setPointersPositions(e);
	//       // add image
	//       console.log(dragObject.current)
	//       if(dragObject.current=="table1"||dragObject.current=="table2"){
	//       setImages(
	//         images.concat([
	//           {
	//             ...stageRef.current.getPointerPosition(),
	//             src: dragUrl.current,
	//             type: dragObject.current,
	//             // fill: "orange",
	//             width: dragWidth.current,
	//             height: dragHeight.current,
	//             id: tableId.current,
	//             name: "",
	//             guest: 1,
	//             price: 100,
	//             // id: tableId.current,
	//           }
	//         ])
	//       );
	//       tableId.current += 1
	//     }
	//     else{
	//       setObject(
	//         objects.concat([
	//           {
	//             ...stageRef.current.getPointerPosition(),
	//             src: dragUrl.current,
	//             type: dragObject.current,
	//             // fill: "orange",
	//             width: dragWidth.current,
	//             height: 100,
	//             id: tableId.current,
	//             name: "",
	//             // guest: 1,
	//             // price: 100,
	//             // id: tableId.current,
	//           }
	//         ])
	//       );
	//       tableId.current += 1
	//     }

	//     }}
	//     onDragOver={e => e.preventDefault()}
	//     onClick={e => {
	//       console.log(images)
	//       console.log(objects)
	//     }}
	//     className={classes.test}
	//   >
	//   <div className={classes.canvas}>
	//     <Stage
	//       width={window.innerWidth*canvasWidth}
	//       height={window.innerHeight*canvasHeight}
	//       style={{ border: '1px solid grey' }}
	//       ref={stageRef}
	//       onMouseDown={checkDeselect}
	//       onTouchStart={checkDeselect}
	//     >
	//       <Layer>
	//         {images.map((rect, i) => {
	//         return (
	//           <Rectangle
	//             key={i}
	//             image={rect.src}
	//             shapeProps={rect}
	//             isSelected={rect.id === selectedId}
	//             src={rect.src}
	//             type={rect.alt}
	//             onSelect={() => {
	//               setShape()
	//               selectShape(rect.id);
	//               setShape(rect)
	//               indexOfImage.current = i
	//               console.log(indexOfImage)
	//               console.log(selectedId)
	//               console.log(rect)
	//             }}
	//             onChange={(newAttrs) => {
	//               const rects = images.slice();
	//               rects[i] = newAttrs;
	// 	            setImages(rects);
	//             }}

	//             onDelete={(newAttrs) => {
	//               setImages(images.filter(img => img.id !== newAttrs));
	//             }}

	//             //onDrop={}
	//             rotation={rect.rotation}
	//           ></Rectangle>
	//         );
	//       })}

	//       {objects.map((object, i) => {
	//         return (
	//           <FreeStyleObject
	//             key={i}
	//             image={object.src}
	//             shapeProps={object}
	//             isSelected={object.id === selectedId}
	//             src={object.src}
	//             type={object.alt}
	//             onSelect={() => {
	//               setShape()
	//               selectShape(object.id);
	//               setShape(object)
	//               indexOfImage.current = i
	//               console.log(indexOfImage)
	//               console.log(selectedId)
	//               console.log(object)
	//             }}
	//             onChange={(newAttrs) => {
	//               const rects = objects.slice();
	//               rects[i] = newAttrs;
	// 	            setObject(rects);
	//             }}

	//             onDelete={(newAttrs) => {
	//               setObject(objects.filter(obj => obj.id !== newAttrs));
	//             }}

	//             //onDrop={}
	//             rotation={object.rotation}
	//           ></FreeStyleObject>
	//         );
	//       })}
	//       </Layer>
	//     </Stage>
	//     </div>
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
