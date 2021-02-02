import React, {useState, useEffect} from 'react';
import HeaderComponent from './HeaderComponent';
import {makeStyles} from '@material-ui/core/styles';
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
    listItems: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        // border: '1px solid red',
        cursor: 'pointer',
    }
}));

const SelectTeamRequest = () => {
    const history = useHistory()
    const [teams, setTeams] = useState([])
    const classes = useStyles();
    
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
                <div className="body-text__bold">
                    {teams.length > 0 ? 'Select Team' : <p className="body-text">There are no teams to display</p>}
                </div>
                <dl 
                    className={classes.listItems}>
                    {teams.map((team) => 
                        <dt 
                            onClick={() => history.push({pathname:'./SubmitRequest', state: {selectTeam: team.teamName}})
                            } 
                            className="body-text">
                            {team.teamName}
                        </dt>
                    )}
                </dl>
            </div>
        </div>
    );
}


export default SelectTeamRequest