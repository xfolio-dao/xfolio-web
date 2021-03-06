import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthorizationSwitch from './navigation/AuthorizationSwitch'
import MainSwitch from './navigation/MainSwitch'

const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    height: '500px',
    width: '400px',
    // backgroundColor: theme.colors.background,
    background: 'linear-gradient(180deg, black, #1b436d)'
}

const Main:React.FC = () => {
    return (
        <div style={mainStyle as React.CSSProperties} id='mainContainer'>
            <Switch>
                <Route path='/authorization'>
                    <AuthorizationSwitch/>
                </Route>
                <Route path='/main'>
                    <MainSwitch/>
                </Route>
            </Switch>
            <Redirect exact from='/' to='/authorization'/>
        </div>
    )
}

export default Main
