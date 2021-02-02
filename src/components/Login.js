import React from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {googleSignIn} from '../actions/auth';
import benches from '../benches.jpg'

const useStyles = makeStyles(({
    loginBlock:{
        margin: '10% 30%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        // border: '2px solid red',
        backgroundImage: `url(${benches})`,
        backgroundSize: 'cover',
        borderRadius: '1rem'
    },
    loginButton: {
        // border: '2px solid red',
        fontFamily:'Arial',
        padding: '1rem',
        margin: '5rem 0 10rem 0',
        width: '25rem',
        fontSize: '1.5rem',
    },
    resize: {
        fontSize:'1.5rem',
    },
    linkStyle: {
        textDecorationLine: 0
    }
}));

const Login = () => {

    const classes = useStyles();
    return (
        <div>
            <div className={classes.loginBlock}>
                <div className="logo">KHEL</div>
                <Button onClick={googleSignIn} className={classes.loginButton} color='primary' variant="contained">Login with Google</Button>
            </div>
        </div>
    )

}


export default Login