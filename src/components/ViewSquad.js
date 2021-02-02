import React, {useState, useEffect} from 'react';
import HeaderComponent from './HeaderComponent';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import database from '../firebase/firebase';
import { auth } from 'firebase';

const useStyles = makeStyles((theme) => ({
    contentBlock:{
        display:'flex',
        flexDirection:'column',
        // border: '2px solid red',
        backgroundSize: 'cover',
        borderRadius: '5rem',
        margin: '10rem 50rem',
        padding: '2rem 5rem',
        background: 'linear-gradient(to bottom right,#0999FF, #071B6A)',
        boxShadow: '3px 3px 5px #000',
    },
    listItem: {
        // border: '1px solid yellow',
        color: 'white',
        fontFamily: "Segoe UI",
        fontSize: '1.6rem',
        fontWeight: 'normal',
        margin: '0 0 1rem 0',
        cursor: 'pointer',
    },
    listCol: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // border: '2px solid white',
    },
    dialogBox:{
        background: 'linear-gradient(to bottom left,#0999FF, #071B6A)',
        cursor: 'pointer',
        backgroundSize: 'cover',
    },
    dialogContent:{
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        fontFamily: "Segoe UI",
        fontSize: '1.6rem',
        fontWeight: 'normal',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ViewSquad = (props) => {
    const classes = useStyles();
    const [players, setPlayers] = useState([])
    const [selectedPlayer, setSelectedPlayer] = useState([])

////--------POP UP RENDER FUNCTIONS--------\\\\
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (player) => {
        setSelectedPlayer(player)
        console.log(selectedPlayer)
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

////--------========--------\\\\
    const getUid = () => {
        return auth().currentUser.uid
    }
    
    useEffect(() => {
        database.ref(`Users/${getUid()}/Teams/${props.location.state.selectTeam}/Players`).once('value').then((snapshot) => {
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
                    {(props.location.state.selectTeam)}
                </div>
                <div className={classes.listCol}>
                    <div>
                        {
                            players.map((player) => {
                                return <div onClick={()=>handleClickOpen(player)} className={classes.listItem}>{player.name}</div>
                            })
                        }
                    </div>
                    <div className={classes.listItem}>Manager: {props.location.state.manager}</div>
                </div>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                onClick={handleClose}
            >
                <DialogContent className={classes.dialogBox}>
                    <DialogContentText className={classes.dialogContent}>
                        <div className="body-text__italic">Name: {selectedPlayer.name}</div>
                        <Divider variant='fullWidth'/>
                        <div className="body-text__italic">Age: {selectedPlayer.age}</div>
                        <Divider/>
                        <div className="body-text__italic">Kit No: {selectedPlayer.kitNo}</div>
                        <Divider/>
                        <div className="body-text__italic">Position: {selectedPlayer.position}</div>
                        <Divider/>
                        <div className="body-text__italic">Email: {selectedPlayer.email}</div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}


export default ViewSquad