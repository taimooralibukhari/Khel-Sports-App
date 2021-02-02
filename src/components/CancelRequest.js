import React, {useState, useEffect} from 'react';
import HeaderComponent from './HeaderComponent';
import {makeStyles} from '@material-ui/core/styles';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Divider from '@material-ui/core/Divider';
import database from '../firebase/firebase';
import {auth} from 'firebase'

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
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // border: '1px solid red',
        color: 'white',
        fontFamily: "Segoe UI",
        fontSize: '1.6rem',
        fontStyle: 'italic',
        fontWeight: 'normal',
        margin: '0 0 1rem 0',

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
    },
    delIcon: {
        margin: '0.3rem 0 0 1rem',
        fontSize: 15,
        cursor: 'pointer',
        // border: '1px solid white',
    },
}));


const CancelRequest = () => {
    const classes = useStyles();
    const [bookings, setBookings] = useState([])


    const getUid = () => {
        return auth().currentUser.uid
    }


    const removeRequest = (booking) => {
        const remBooking = booking.id
        return database.ref(`Bookings/${remBooking}`).remove().then(() => {
            const newBookings = bookings.filter((e) => e.id !== remBooking)
            setBookings(newBookings)
    
        }).catch((e) => {
            console.log(e)
        })
    }

    const changeRequest = (booking) => {
        const changedBooking = booking.id
        return database.ref(`Bookings/${changedBooking}`).update(
            {
                requestStatus: 'Pending',
                matchvs: '',
            }
        ).then(() => {
            const chgBooking = booking.id
            const newBookings = bookings.filter((e) => e.id !== chgBooking)
            setBookings(newBookings)
            
        }).catch((e) => {
            console.log(e)
        })
    }

    const removeOrchange = (booking) => {
        if (getUid() === booking.uid){
            removeRequest(booking)
        } else {
            changeRequest(booking)
        }
        // return getUid() === booking.uid ? removeRequest(booking) : changeRequest(booking)
    }
    
    useEffect(() => {
        database.ref(`Bookings`).once('value').then((snapshot) => {
            const bookings = []
            snapshot.forEach((childSnapshot) => {  
                bookings.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                }) 
            })
            setBookings(bookings)
        })
    }, [])

    return (
        <div>
            <HeaderComponent/>
            <div className={classes.contentBlock}>
                <div className={classes.listRow}>
                    <div className={classes.listHeading}>
                        Bookings<Divider/>
                        {console.log(bookings)}
                    </div>
                    {bookings.length > 0 ?
                        bookings.map((booking) => {
                            return <div className={classes.listItem}>{booking.requestedBy}
                            <RemoveCircleOutlineIcon
                                color='secondary'
                                className={classes.delIcon}
                                onClick={() => removeOrchange(booking)}
                            />
                            </div>
                        }): <div className="body-text__italic">There are no bookings to display</div>
                        
                    }
                </div>
            </div>
        </div>
    );
}


export default CancelRequest