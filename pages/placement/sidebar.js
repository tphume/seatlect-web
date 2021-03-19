import React,{ Component,useState } from 'react';
import { Button, InputGroup, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
	canvas:{
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
	inputGroup,text:{
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
		borderTopLeftRadius:`20px`,
		borderTopRightRadius:`20px`,
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
		display:flex,
		justifyContent: space-evenly,
		paddingLeft: `20%`,
		paddingRight: `20%`,
		paddingTop: `10px`,
		height: `110px`
	},
	sliderBar:{
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

const Sidebar = ({shapeProps, onChangeSidebar, onDelete}) => {
  const maxGuest = React.useRef();
  // const [guestValue, selectedGuest] = useState({value: shapeProps.guest});
  console.log(shapeProps)
  try {
    console.log(shapeProps)
    console.log(shapeProps.x)
    console.log(shapeProps.y)
    console.log(shapeProps.rotation)
    console.log(shapeProps.guest)
    console.log(shapeProps.id)
    maxGuest.current = shapeProps.guest
    const xValue = Math.round(shapeProps.x)
    const yValue = Math.round(shapeProps.y)
    
    return (
      <div className={classes.sidebar}>
        <Label className={classes.headerSidebar}>Table {shapeProps.id} </Label>
        <InputGroup className="mb-2" className={classes.inputGroup}>
          <InputGroup.Text  className={classes.inputGroup,classes.text}>X</InputGroup.Text>
          <FormControl placeholder="X coordinate" value={xValue} readOnly />
        </InputGroup>
        <InputGroup className="mb-2" className={classes.inputGroup}>
          <InputGroup.Text className={classes.inputGroup,classes.text}>Y</InputGroup.Text>
          <FormControl placeholder="Y coordinate" value={yValue}  readOnly/>
        </InputGroup>
        <InputGroup className="mb-2" className={classes.inputGroup}>
          <InputGroup.Text className={classes.inputGroup,classes.text}>ID</InputGroup.Text>
          <FormControl placeholder="Y coordinate" value={shapeProps.id}  readOnly/>
        </InputGroup>
        <InputGroup className="mb-2" className={classes.inputGroup}>
          <InputGroup.Text className={classes.inputGroup,classes.text}>Name</InputGroup.Text>
          <FormControl placeholder="Table 1" defaultValue={shapeProps.name} 
            onChange={ e => {
              console.log(e.target.value)
              console.log(shapeProps.type)
              onChangeSidebar({...shapeProps,name: e.target.value});
            }} 
            onClick={e => {
              console.log(shapeProps.type)
            }}
          />
        </InputGroup>
        <InputGroup className="mb-5" className={classes.inputGroup}>
          <InputGroup.Text id="basic-addon1" className={classes.inputGroup,classes.text}>Price</InputGroup.Text>
          <FormControl id="guestNo" defaultValue={shapeProps.price}  
          onChange={ e => {
              console.log(e.target.value)
              // shapeProps.guest = parseInt(e.target.value)
              
              onChangeSidebar({...shapeProps,price:parseInt(e.target.value)});
              // onChangeSidebar(value);
            }
          }/>
        </InputGroup>
        <InputGroup className="mb-5" className={classes.inputGroup}>
          <InputGroup.Text id="basic-addon1" className={classes.inputGroup,classes.text}>Max Guest</InputGroup.Text>
          <FormControl id="guestNo" defaultValue={shapeProps.guest}  
          onChange={ e => {
              console.log(e.target.value)
              console.log(shapeProps.guest)
              // shapeProps.guest = parseInt(e.target.value)
              
              onChangeSidebar({...shapeProps,guest:parseInt(e.target.value)});
              // onChangeSidebar(value);
            }
          }/>
        </InputGroup>
        <Button variant="danger"
          onClick={(e)=>{
            console.log('delete')
            onDelete(shapeProps.id)
          }}>Delete</Button>{' '}
      </div>
    );
  } catch (error) {
      return(
        <div className={classes.sidebar}>
          <Label className={classes.headerSidebar}>Table </Label>
        </div>
    );
  }
};

export default Sidebar;
	