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

const AddPlayer = (props) => {
    const classes = useStyles();
    const history = useHistory()

    const getUid = () => {
        return auth().currentUser.uid
    }
    
    const handleAddPlayer = (e) => {
        e.preventDefault()
        database.ref(`Users/${getUid()}/Teams/${props.match.params.id}/Players/${e.target.elements.name.value.trim()}`).update(
            {
                name: e.target.elements.name.value.trim(),
                kitNo: e.target.elements.kitno.value.trim(),
                position: e.target.elements.position.value.trim(),
                age: e.target.elements.age.value.trim(),
                email: e.target.elements.email.value.trim(),
            }
        )
        history.push(`/addremoveplayer/${props.match.params.id}`)
    }
    return(
        <div>
        <HeaderComponent/>
            <div className={classes.formblock}>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleAddPlayer}>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="name" placeholder="Name" variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="kitno" placeholder="Kit No." variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="position" placeholder="Position" variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="age" placeholder="Age" variant="outlined"/>
                    <TextField size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" name="email" placeholder="Email Address" variant="outlined"/>
                    <Button type="submit" className={classes.saveButton} color="primary" variant="contained">Add</Button>
                </form>
            </div>
        </div>
    )
}

export default AddPlayer