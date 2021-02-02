import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import database from '../firebase/firebase';
import {auth} from 'firebase'


const useStyles = makeStyles((theme) => ({
    
    dashboardButton: {
        display: 'flex',
        fontFamily:'Arial',
        padding: '1rem',
        marginTop: '3rem',
        width: '30rem',
        fontSize: '1.5rem',
    },
    block: {
        border: '2px solid white',
        height: '100%'
    },
    buttonBlock:{
        marginTop: '10rem',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        // border: '2px solid white',
    },
    size:{
        width: theme.spacing(10),
        height: theme.spacing(10),
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

const RequestFeed = () => {
    const classes = useStyles();
    const [bookings, setBookings] = useState([])
    const [teams, setTeams] = useState([])
    const [requestID, setRequestID] = useState('')
    const [requestedBy, setRequestedBy] = useState('')

    const getUid = () => {
        return auth().currentUser.uid
    }

    ////--------POP UP RENDER FUNCTIONS--------\\\\
    const [open, setOpen] = useState(false);

    const handleClickOpen = (booking) => {
        setRequestID(booking.requestID)
        setRequestedBy(booking.requestedBy)
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    ////--------========--------\\\\


    useEffect(() => {
        database.ref('Bookings').once('value').then((snapshot) => {
            const bookings = []
            snapshot.forEach((childSnapshot) => {
                bookings.push({
                    requestID: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            const pendingBookings = bookings.filter((booking) => booking.requestStatus !== 'Accepted')
            setBookings(pendingBookings)
        })

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

    const handleAccept = (e) => {
        e.preventDefault()
        database.ref(`Bookings/${requestID}`).update(
            {
                requestStatus: 'Accepted',
                matchvs: `${String(requestedBy)} vs ${e.target.elements.bookedby.value}`,
    
            }
        )
        database.ref('Bookings').once('value').then((snapshot) => {
            const bookings = []
            snapshot.forEach((childSnapshot) => {
                bookings.push({
                    requestID: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            const pendingBookings = bookings.filter((booking) => booking.requestStatus !== 'Accepted')
            setBookings(pendingBookings)
        })
        handleClose()
    }

    return (
        <div>
            {bookings.map((booking) => {
                return <div className="body-text__m">
                    Team: <span className="body-text__italic">{booking.requestedBy}</span><br/>
                    Venue: <span className="body-text__italic">{booking.venue}</span><br/>
                    Date: <span className="body-text__italic">{booking.date}</span><br/>
                    Time: <span className="body-text__italic">{booking.time}</span><br/>
                    Sport: <span className="body-text__italic">{booking.sport}</span><br/>
                    Email: <span className="body-text__italic">{booking.email}</span><br/>
                    <Button onClick={()=>handleClickOpen(booking)} color="primary" variant="contained">Choose Team</Button>
                </div>
            })}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogContent className={classes.dialogBox}>
                    <DialogContentText className={classes.dialogContent}>
                        <div className="body-text__italic">
                            {teams.length > 0 ? 
                                <form onSubmit={handleAccept}>
                                    {teams.map((team) => 
                                        <div>
                                            <input type="radio" id={team.teamName} name="bookedby" value={team.teamName}></input>
                                            <label for={team.teamName}>{team.teamName}</label><br/><br/>
                                        </div>
                                    )}
                                    <Button type="submit" color="primary" variant="contained">Accept</Button>
                                </form> 
                            : <p className="body-text">There are no teams to display</p>}
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
        
    )
}

export default RequestFeed;