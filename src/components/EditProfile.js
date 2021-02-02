import React, {useState, useEffect} from 'react';
import {TextField,Button,SvgIcon,Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link, useHistory} from 'react-router-dom'
import database from '../firebase/firebase';
import { auth } from 'firebase';


const useStyles = makeStyles((theme) => ({
    homeIcon: {
        margin: '5px 0 0 5px',
        fontSize: 30,
        // border: '2px solid white',
        
    },
    size: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    formblock:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        // border: '2px solid white',

    },
    form:{
        width: '30%',
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        // border: '2px solid white',
        
    },
    formInput: {
        marginTop: '3rem',
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 10,

    },
    saveButton: {
        display: 'flex',
        // border: '2px solid white',
        fontFamily:'Arial',
        padding: '1rem',
        marginTop: '3rem',
        marginRight: '3rem',
        width: '20rem',
        fontSize: '1.5rem',
    },
    clearButton: {
        display: 'flex',
        // border: '2px solid white',
        fontFamily:'Arial',
        padding: '1rem',
        marginTop: '3rem',
        width: '20rem',
        fontSize: '1.5rem',
    },
    resize: {
        fontSize:'1.5rem',
    },
    avatarSize: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        // border: '2px solid white',
    },
    buttonSet: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // border: '2px solid white',
    }
}));

const HomeIcon = (props) => {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

const EditAccount = () => {
    const history = useHistory()
    const classes = useStyles();
    const [profile, setProfile] = useState([])
    const [name,setName] = useState('')

    const getUid = () => {
        return auth().currentUser.uid
    }

    useEffect(() => {
        database.ref(`Users/${getUid()}/Profile`).once('value').then((snapshot) => {
            const profile = [] 
                profile.push(
                    snapshot.val()
                )
            profile[0] && setProfile(profile[0])
        })
    }, [])

    const handleSave = (e) => {
        e.preventDefault()
        database.ref(`Users/${getUid()}/Profile`).update(
            {
                name: e.target.elements.name.value.trim(),
                dob: e.target.elements.dob.value.trim(),
                city: e.target.elements.city.value.trim(),
                sport: e.target.elements.sport.value.trim(),
                designation: e.target.elements.designation.value.trim(),
            }
        )
        history.push('./Dashboard')
    }

    const handleChange = (e) => {
        let currentprofile  = {...profile}
        console.log(currentprofile)
        currentprofile[e.target.name] = e.target.value;
        setProfile(currentprofile)

    }


    return(
        <div>
            <div className={classes.homeIcon}>
                <Link style={{
                        textDecoration: 'none',
                        color: 'white'
                    }} 
                    to="/dashboard"><HomeIcon className={classes.homeIcon}/>
                </Link>
            </div>
            <div className="change-avatar">
                <Avatar className={classes.avatarSize} aria-controls="simple-menu" variant="rounded" alt="avatar" src="https://avatarfiles.alphacoders.com/114/114364.jpg"/>
                <div className="change-dp">Change profile picture</div>
            </div>
            <div className={classes.formblock}>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSave}>
                    <TextField onChange={handleChange} size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" placeholder="Name" name="name" value={profile.name} variant="outlined"/>
                    <TextField onChange={handleChange} size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="date" placeholder="Date of Birth" name="dob" value={profile.dob} variant="outlined"/>
                    <TextField onChange={handleChange} size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" placeholder="City" name="city" value={profile.city} variant="outlined"/>
                    <TextField onChange={handleChange} size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" placeholder="Sport" name="sport" value={profile.sport} variant="outlined"/>
                    <TextField onChange={handleChange} size="small" InputProps={{classes: {input: classes.resize}}} className={classes.formInput} type="text" placeholder="Designation" name="designation" value={profile.designation} variant="outlined"/>
                    <div className={classes.buttonSet}>
                        <Button type="submit" className={classes.saveButton} color="primary" variant="contained">Save</Button>
                    </div>
                    
                </form>
                
            </div>
        </div>
    )
}

export default EditAccount;