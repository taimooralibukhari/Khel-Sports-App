import React, {useState, useEffect} from 'react';
import HeaderComponent from './HeaderComponent';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import database from '../firebase/firebase';

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
        // border: '1px solid red',
        color: 'white',
        fontFamily: "Segoe UI",
        fontSize: '1.6rem',
        fontStyle: 'italic',
        fontWeight: 'normal',
        margin: '0 0 1rem 0',
        cursor: 'pointer',
    },
    listHeading: {
        // border: '1px solid red',
        color: 'white',
        fontFamily: "Segoe UI",
        fontSize: '2.4rem',
        // fontStyle: 'italic',
        fontWeight: 'normal',
        margin: '0 0 1rem 0',
        // cursor: 'pointer',
    },
    listCol: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // border: '2px solid white',
    },
    listRow: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        // border: '2px solid green',
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

const ViewRequest = () => {
    const classes = useStyles();
    const [bookings, setBookings] = useState([])
    const [selectedBooking, setSelectedBooking] = useState([])

////--------POP UP RENDER FUNCTIONS--------\\\\
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (booking) => {
        setSelectedBooking(booking)
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
            setBookings(bookings)
        })
        console.log(bookings)
    }, [])


    return (
        <div>
            <HeaderComponent/>
            <div className={classes.contentBlock}>
                <div className={classes.listCol}>
                    <div className={classes.listRow}>
                        <div className={classes.listHeading}>Bookings<Divider/></div>
                        {bookings.length > 0 ? 
                            bookings.map((booking) => {
                                return <div onClick={()=>handleClickOpen(booking)} className={classes.listItem}>{(booking.matchvs) ? booking.matchvs : booking.requestedBy}</div>
                            })
                            : <div className="body-text__italic">There are no bookings to display</div>
                        }
                    </div>
                    <div className={classes.listRow}>
                       <div className={classes.listHeading}>Status<Divider/></div>
                       {                            
                            bookings.map((booking) => <div className={classes.listItem}>{booking.requestStatus}</div>)
                        }
                    </div>
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
                        <div className="body-text__italic">Venue: {selectedBooking.venue}</div>
                        <Divider/>
                        <div className="body-text__italic">Date: {selectedBooking.date}</div>
                        <Divider/>
                        <div className="body-text__italic">Time: {selectedBooking.time}</div>
                        <Divider/>
                        <div className="body-text__italic">Sport: {selectedBooking.sport}</div>
                        <Divider/>
                        <div className="body-text__italic">Email: {selectedBooking.email}</div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}


export default ViewRequest