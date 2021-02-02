import React from 'react';
import {Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import {googleSignOut} from '../actions/auth';
import {auth} from 'firebase'

const HeaderComponent = () => {
    const useStyles = makeStyles((theme) => ({
        size: {
          width: theme.spacing(10),
          height: theme.spacing(10),
        },
        list: {
            width: 150,
        },
        fullList: {
            width: 'auto',
        },
        menuButton: {
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            // border: '2px solid red',
            padding: '1rem',
            cursor: 'pointer',
            color: '#FFF',
            fontSize: 'large'
        },
        drawerStyle: {
            backgroundColor: '#2196f3',
        },
        listItemText:{
            fontSize:'8rem',
          }
    }));
    const classes = useStyles();
    //--------MENU DRAWER COMPONENT--------\\
    
    const [state, setState] = React.useState({
        left: false
    });
    

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === "top" || anchor === "bottom"
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
            <List className={classes.drawerStyle}>
                <Link style={{
                    textDecoration: 'none',
                    color: 'black',
                    }} 
                    to="/dashboard"
                >
                    <ListItem button>
                        <ListItemText className={{primary:classes.listItemText}}>Home</ListItemText>
                    </ListItem>
                </Link>
                <Link style={{
                    textDecoration: 'none',
                    color: 'black',
                    }} 
                    to="/editprofile"
                >
                    <ListItem button>
                        <ListItemText className={{primary:classes.listItemText}}>Edit Profile</ListItemText>
                    </ListItem>
                </Link>
                <ListItem button onClick={googleSignOut}>
                <ListItemText className={{primary:classes.listItemText}}>Logout</ListItemText>
                </ListItem>
            </List>
        </div>
    );
    //--------=====================================-------\\
    
    return(
        <div>
            <div className="nav-bar">
                <div>
                    {["left"].map((anchor) => (
                            <React.Fragment key={anchor}>
                            <MenuIcon className={classes.menuButton} onClick={toggleDrawer(anchor, true)} />
                            <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                            >
                                {list(anchor)}
                            </Drawer>
                            </React.Fragment>
                        ))
                    }
                </div>
                <div className="logo-header">
                    KHEL
                    <div className="logo-sub__heading">
                        Welcome,
                        {auth().currentUser && 
                        <p>{(auth().currentUser.email.split("@").shift())}!</p>}
                    </div>        
                </div>
                <div className="avatar">
                    <Avatar className={classes.size} variant="rounded" alt="avatar" src="https://avatarfiles.alphacoders.com/114/114364.jpg"/>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;