import React from 'react';
import {Button,ButtonGroup} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import HeaderComponent from './HeaderComponent';

const useStyles = makeStyles(({
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
}));

const Matchmaking = () => {
    const classes = useStyles();
    return (
        <div>
            <HeaderComponent/>
            <ButtonGroup className={classes.buttonBlock}>
                <Link style={{ textDecoration: 'none' }} to="/selectteamrequest">
                    <Button className={classes.dashboardButton} color="primary" variant="contained">
                        Submit a Request
                    </Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/cancelrequest">
                    <Button className={classes.dashboardButton} color="primary" variant="contained">
                        Cancel Request
                    </Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/viewrequest">
                    <Button className={classes.dashboardButton} color="primary" variant="contained">
                        View Request
                    </Button>
                </Link>
            </ButtonGroup>
        </div>
    )
}

export default Matchmaking;