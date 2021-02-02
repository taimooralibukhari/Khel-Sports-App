import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button,TextField} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import HeaderComponent from './HeaderComponent';
import database from '../firebase/firebase';
import {auth} from 'firebase'

const useStyles = makeStyles((theme) => ({
    size: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    formblock:{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        // border: '2px solid white',

    },
    form:{
        width:'30%',
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        // border: '2px solid white',
        
    },
    formInput: {
        marginTop: '3rem',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width:'100%',
    },
    saveButton: {
        // border: '2px solid white',
        display: 'flex',
        fontFamily:'Arial',
        padding: '1rem',
        marginTop: '3rem',
        width: '20rem',
        fontSize: '1.5rem',
    },
    resize: {
        fontSize:'1.5rem',
    },
}));

const SubmitRequest = (props) => {
    const classes = useStyles();
    const history = useHistory()

    const getUid = () => {
        return auth().currentUser.uid
    }


    
    const handleSubmitRequest = (e) => {
        e.preventDefault()
        database.ref(`Bookings`).push(
            {
                uid: getUid(),
                requestedBy: props.location.state.selectTeam,
                requestStatus: 'Pending',
                matchvs: '',
                venue: e.target.elements.venue.value.trim(),
                date: e.target.elements.date.value.trim(),
                time: e.target.elements.time.value.trim(),
                sport: e.target.elements.sport.value.trim(),
                email: e.target.elements.email.value.trim(),  
            }
        )
        history.push({pathname: './ViewRequest', state: {bookedBy: props.location.state.selectTeam}})
    }
    return(
        <div>
        <HeaderComponent/>
            <div className={classes.formblock}>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmitRequest}>
                    {/* <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="matchvs" placeholder="Match vs" variant="outlined"/> */}
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="venue" placeholder="Venue" variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="date" name="date" placeholder="Date" variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="time" name="time" placeholder="Time" variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="sport" placeholder="Sport" variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="email" placeholder="Email Address" variant="outlined"/>
                    <Button type="submit" className={classes.saveButton} color="primary" variant="contained">Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default SubmitRequest