import React from 'react';
import {Button,ButtonGroup} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import RequestFeed from './RequestFeed';


const useStyles = makeStyles((theme) => ({
    
    dashboardButton: {
        display: 'flex',
        fontFamily:'Arial',
        padding: '1rem',
        marginTop: '3rem',
        width: '30rem',
        fontSize: '1.5rem',
    },
    buttonBlock:{
        marginTop: '10rem',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        // border: '2px solid white',
    },
    size:{
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
}));


const Dashboard = () => {
    const classes = useStyles();

    return (
        <div>
            <HeaderComponent/>
            <ButtonGroup className={classes.buttonBlock}>
                <Link style={{ textDecoration: 'none' }} to="/teammanagement"><Button disableRipple className={classes.dashboardButton} color="primary" variant="contained">Team Management</Button></Link>
                <Link style={{ textDecoration: 'none' }} to="/matchmaking"><Button disableRipple className={classes.dashboardButton} color="primary" variant="contained">Matchmaking</Button></Link>
                <Link style={{ textDecoration: 'none' }} to="/fixtures"><Button disableRipple className={classes.dashboardButton} color="primary" variant="contained">Fixtures</Button></Link>
            </ButtonGroup>
            <RequestFeed/>
        </div>
    )
}

export default Dashboard;