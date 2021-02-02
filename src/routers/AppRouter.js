import React from 'react';
import {Route,Redirect,Switch, withRouter} from 'react-router-dom';
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Login from "../components/Login";
import EditProfile from "../components/EditProfile";
import Dashboard from "../components/Dashboard";
import TeamManagement from "../components/TeamManagement";
import Matchmaking from "../components/Matchmaking";
import Fixtures from "../components/Fixtures";
import AddRemoveTeam from "../components/AddRemoveTeam";
import AddTeam from "../components/AddTeam";
import SelectTeam from "../components/SelectTeam";
import AddRemovePlayer from "../components/AddRemovePlayer";
import AddPlayer from "../components/AddPlayer";
import SelectTeamView from "../components/SelectTeamView";
import ViewSquad from "../components/ViewSquad";
import SelectTeamRequest from "../components/SelectTeamRequest";
import SubmitRequest from "../components/SubmitRequest";
import CancelRequest from "../components/CancelRequest";
import ViewRequest from "../components/ViewRequest";



const AppRouter = ({location}) => {
    return (
        <Wrapper>
            <TransitionGroup className="transition-group">
                <CSSTransition
                    key={location.key}
                    timeout={{ enter: 400, exit: 400 }}
                    classNames={"fade"}
                >
                    <section className="route-section">
                        <Switch location={location}>
                            <Redirect exact from="/" to="/login" />
                            <Route path="/login" component={Login} exact={true}/>
                            <Route path="/dashboard" component={Dashboard} exact={true}/>
                            <Route path="/teammanagement" component={TeamManagement} exact={true}/>
                            <Route path="/matchmaking" component={Matchmaking} exact={true}/>
                            <Route path="/fixtures" component={Fixtures} exact={true}/>
                            <Route path="/editprofile" component={EditProfile} exact={true}/>
                            <Route path="/addremoveteam" component={AddRemoveTeam} exact={true}/>
                            <Route path="/addteam" component={AddTeam} exact={true}/>
                            <Route path="/selectteam" component={SelectTeam} exact={true}/>
                            <Route path="/addremoveplayer/:id" component={AddRemovePlayer} exact={true}/>
                            <Route path="/addremoveplayer/:id/addplayer" component={AddPlayer} exact={true}/>
                            <Route path="/selectteamview" component={SelectTeamView} exact={true}/>
                            <Route path="/viewsquad" component={ViewSquad} exact={true}/>
                            <Route path="/selectteamrequest" component={SelectTeamRequest} exact={true}/>
                            <Route path="/submitrequest" component={SubmitRequest} exact={true}/>
                            <Route path="/cancelrequest" component={CancelRequest} exact={true}/>
                            <Route path="/viewrequest" component={ViewRequest} exact={true}/>
                        </Switch>
                    </section>
                </CSSTransition>
            </TransitionGroup>
        </Wrapper>
    )
}

//===========-------------React Router Transition Styling-------------===========\\

const Wrapper = styled.div`
    .fade-enter {
        opacity: 0.01;
    }
    .fade-enter.fade-enter-active {
        opacity: 1;
        transition: opacity 400ms ease-in;
    }
    .fade-exit {
        opacity: 1;
    }
      
    .fade-exit.fade-exit-active {
        opacity: 0.01;
        transition: opacity 400ms ease-out;
    }
    div.transition-group {
        position: relative;
    }
    section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    }
`;

//===========-------------|||||||||||||||||-------------===========\\


export default withRouter(AppRouter);