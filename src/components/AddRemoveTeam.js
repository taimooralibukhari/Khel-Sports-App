import React, {useState, useEffect} from 'react';
import HeaderComponent from './HeaderComponent';
import {makeStyles} from '@material-ui/core/styles';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import database from '../firebase/firebase';
import { auth } from 'firebase';


const useStyles = makeStyles((theme) => ({
    contentBlock:{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        // border: '2px solid red',
        backgroundSize: 'cover',
        borderRadius: '5rem',
        margin: '10rem 50rem',
        padding: '2rem 5rem',
        background: 'linear-gradient(to bottom right,#0999FF, #071B6A)',
        boxShadow: '3px 3px 5px #000',
    },
    addButton: {
        fontFamily: 'Arial',
        width: '15rem',
        fontSize: '1.3rem',
        marginBottom: '2rem',
        borderRadius: '4rem'
        // border: '2px solid red'
    },
    delIcon: {
        margin: ' 0 0 0 2rem',
        fontSize: 15,
        cursor: 'pointer',
        // border: '1px solid red',
    },
    listItems: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        // border: '1px solid red',
    }
}));

const AddRemoveTeam = () => {
    const history = useHistory()
    const [teams, setTeams] = useState([])
    const classes = useStyles();

    const removeTeam = (team) => {
        const remTeam = team.teamName
        return () => database.ref(`Users/${getUid()}/Teams/${team.teamName}`).remove().then(() => {
            const newTeams = teams.filter((e) => e.teamName !== remTeam)
            setTeams(newTeams)
        }).catch((e) => {
            console.log(e)
        })
    }
    
    const getUid = () => {
        return auth().currentUser.uid
    }

    useEffect(() => {
        database.ref(`Users/${getUid()}/Teams`).once('value').then((snapshot) => {
            const teams = []
            snapshot.forEach((childSnapshot) => {  
                teams.push({
                    ...childSnapshot.val()
                })
            })
            setTeams(teams)
        })
    }, [])

    return (
        <div>
            <HeaderComponent/>
            <div className={classes.contentBlock}>
                <div className="body-text">My Teams</div>
                <dl className={classes.listItems}>
                    {teams.map((team) => 
                            <dt className="body-text">
                            {team.teamName}
                            <RemoveCircleOutlineIcon
                                color='secondary'
                                className={classes.delIcon}
                                onClick={removeTeam(team)}
                            />
                            </dt>
                        )
                    }
                </dl>
                <Button onClick={()=>history.push('./AddTeam')} color="primary" variant="contained" className = {classes.addButton}>Add Team</Button>
            </div>
        </div>
    );
}


export default AddRemoveTeam