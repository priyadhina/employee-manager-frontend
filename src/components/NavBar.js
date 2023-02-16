import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { removeUserSession } from '../helpers/utils';

const useStyles = makeStyles(() => ({
  drawer: {
    width: '100px',
  },
  link: {
    textDecoration: 'none',
    color: 'blue',
    fontSize: '20px',
  },
  icon: {
    color: 'white',
  },
}));

const DrawerComponent = ({ isAdmin }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        PaperProps={{ className: classes.drawer }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Toolbar />
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/home">Home</Link>
            </ListItemText>
          </ListItem>
          {isAdmin && (
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/chart">Chart</Link>
              </ListItemText>
            </ListItem>
          )}
          <ListItem onClick={() => removeUserSession()}>
            <ListItemText>
              <Link to="/">Logout</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

const NavBar = ({ isAdmin }) => {
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <DrawerComponent isAdmin={isAdmin} />
        <Typography variant="h6">Employee Management App</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
