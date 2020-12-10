import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Edit from '@material-ui/icons/Edit';
import MenuBook from '@material-ui/icons/MenuBook';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    padding: `1rem`
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  whiteColor: {
    color: `white`
  },
  primaryColor: {
    color: theme.palette.primary.main
  },
  item: {
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: 'white'
    }
  }
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const router = useRouter();

  // Helper function for list items
  const setTextColor = (route) => {
    if (route === router.pathname) {
      return classes.primaryColor;
    }

    return classes.whiteColor;
  };

  const setIconColor = (route) => {
    if (route === router.pathname) {
      return {
        color: '#5D55B4'
      };
    }

    return { color: 'white' };
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            SEATLECT for Business
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button dense selected={'/' === router.pathname} className={classes.item}>
              <ListItemIcon>
                <Home style={setIconColor('/')} />
              </ListItemIcon>
              <ListItemText primary="Home" classes={{ root: setTextColor('/') }} />
            </ListItem>
            <ListItem button dense selected={'/schedule' === router.pathname}>
              <ListItemIcon>
                <CalendarToday style={setIconColor('/schedule')} />
              </ListItemIcon>
              <ListItemText
                primary="Schedule"
                classes={{ root: setTextColor('/schedule') }}
                selected={'/' === router.pathname}
              />
            </ListItem>
            <ListItem button dense selected={'/floorplan' === router.pathname}>
              <ListItemIcon>
                <Edit style={setIconColor('/floorplan')} />
              </ListItemIcon>
              <ListItemText
                primary="Floor Plan"
                classes={{ root: setTextColor('/floorplan') }}
                selected={'/' === router.pathname}
              />
            </ListItem>
            <ListItem button dense selected={'/menu' === router.pathname}>
              <ListItemIcon>
                <MenuBook style={setIconColor('/menu')} />
              </ListItemIcon>
              <ListItemText primary="Menu" classes={{ root: setTextColor('/menu') }} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
}
