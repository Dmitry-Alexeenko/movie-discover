import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {Header} from "./components/Header";
import {Movies} from "./pages/Movies";
import {Movie} from "./pages/Movie";

export const App = () => {
    return (
        <div>
            <Header/>

            <BrowserRouter>

                    <Switch>
                        <Route exact path={'/'} render={() => <Movies/>}/>
                        <Route path={'/movie/:id?'} render={() => <Movie/>}/>
                        <Redirect to={'/'}/>
                    </Switch>

            </BrowserRouter>

        </div>
    )
}