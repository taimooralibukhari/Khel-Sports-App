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

const AddTeam = () => {
    const classes = useStyles();
    const history = useHistory()

    const getUid = () => {
        return auth().currentUser.uid
    }
    
    const handleAddTeam = (e) => {
        e.preventDefault()
        database.ref(`Users/${getUid()}/Teams/${e.target.elements.team.value.trim()}`).update({
            teamName: e.target.elements.team.value.trim(),
            managerName: e.target.elements.manager.value.trim(),
            captainName: e.target.elements.captain.value.trim(),
            sport: e.target.elements.sport.value.trim(),
            location: e.target.elements.location.value.trim(), 
        })
        history.push('./AddRemoveTeam')
    }
    return(
        <div>
        <HeaderComponent/>
            <div className={classes.formblock}>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleAddTeam}>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="team" placeholder="Team name" variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="manager" placeholder="Manager name" variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="captain" placeholder="Captain name" variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="sport" placeholder="Sport" variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="location" placeholder="City" variant="outlined"/>
                    <Button type="submit" className={classes.saveButton} color="primary" variant="contained">Add</Button>
                </form>
            </div>
        </div>
    )
}

export default AddTeam