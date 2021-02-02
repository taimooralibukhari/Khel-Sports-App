import React, {useState, useEffect} from 'react';
import HeaderComponent from './HeaderComponent';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
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
        margin: '4rem 50rem',
        padding: '2rem 5rem',
        background: 'linear-gradient(to bottom right,#0999FF, #071B6A)',
        boxShadow: '3px 3px 5px #000',
    },
    addButton: {
        fontFamily: 'Arial',
        width: '15rem',
        fontSize: '1.3rem',
        margin: '3rem 0 1rem 0',
        borderRadius: '4rem'
        // border: '2px solid red'
    },
    listBox: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        // border: '1px solid red',
    },
    listHeading: {
        margin: '0 5rem 0 5rem',
        // border: '1px solid white',
        textAlign: 'center',
        color: 'white',
        fontFamily: "Segoe UI",
        fontSize: '2.4rem',
        fontWeight: 'normal',
    },
    listItemBox: {
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // border: '1px solid white',
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        textAlign: 'center',
        color: 'white',
        fontFamily: "Segoe UI",
        fontSize: '1.6rem',
        fontWeight: 'normal',
        margin: '0 0 2rem 0',
        // border: '1px solid white',
        // width: '50%'
    },
    delIcon: {
        margin: ' .2rem 0 0 2rem',
        fontSize: 15,
        cursor: 'pointer',
        // border: '1px solid red',
    },
}));



const AddRemovePlayer = (props) => {
    const history = useHistory()
    const [players, setPlayers] = useState([])
    const classes = useStyles();
    
    const getUid = () => {
        return auth().currentUser.uid
    }
    const removePlayer = (player) => {
        const remPlayer = player.name
        return database.ref(`Users/${getUid()}/Teams/${props.match.params.id}/Players/${player.name}`).remove().then(() => {
            const newPlayers = players.filter((e) => e.name !== remPlayer)
            setPlayers(newPlayers)
        }).catch((e) => {
            console.log(e)
        })
    }

    useEffect(() => {
        database.ref(`Users/${getUid()}/Teams/${props.match.params.id}/Players`).once('value').then((snapshot) => {
            const players = []
            snapshot.forEach((childSnapshot) => {  
                players.push({
                    ...childSnapshot.val()
                })
            })
            setPlayers(players)
        })
    }, [])

    return (
        <div>
            <HeaderComponent/>
            <div className={classes.contentBlock}>
                <div className="body-text">
                    {(props.match.params.id)}
                </div>
                <div className={classes.listBox}>
                    <div className={classes.listHeadingBox}>
                        <div className={classes.listHeading}>
                            Name
                        </div>
                        <div className={classes.listItemBox}>
                            {players.map((player) => 
                                    <div className={classes.listItem}>
                                        {player.name}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={classes.listHeadingBox}>
                        <div className={classes.listHeading}>
                            Kit#
                        </div>
                        <div className={classes.listItemBox}>
                            {players.map((player) => 
                                    <div className={classes.listItem}>
                                        {player.kitNo}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={classes.listHeadingBox}>
                        <div className={classes.listHeading}>
                            Position
                        </div>
                        <div className={classes.listItemBox}>
                            {players.map((player) => 
                                    <div className={classes.listItem}>
                                        {player.position}
                                        <RemoveCircleOutlineIcon
                                            color='secondary'
                                            className={classes.delIcon}
                                            onClick={() => removePlayer(player)}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <Button onClick={()=>history.push({
                    pathname: `./${props.match.params.id}/addplayer`,
                    state: {
                        teamName: props.match.params.id
                    }
                })} color="primary" variant="contained" className = {classes.addButton}>Add Player</Button>
            </div>
        </div>
    );
}


export default AddRemovePlayer