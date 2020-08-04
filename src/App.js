import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './shared/header/Header';
import Home from './screens/home/Home';
import Movie from './screens/movieDetails/Movie';
import TvSeries from './screens/tvSeries/TvSeries';
import TvSeriesDetails from './screens/tvSeriesDetails/TvSeriesDetails';
import Actors from './screens/actors/Actors';
import ActorDetails from './screens/actorsDetails/ActorDetails';
import Signin from './screens/signin/Signin';
import Signup from './screens/signup/Signup';
import NotFound from './shared/notFound/NotFound';
import Favourites from './screens/favourites/favourites';

const Routing = () => {
    return (
        <BrowserRouter basename="Home">
            <React.Fragment>
                <div>
                    <Header />
                </div>
                <div>
                    <Switch>
                        <Route path="/signup" component={Signup} exact />
                        <Route path="/signin" component={Signin} exact />
                        <Route path="/actors" component={Actors} exact />
                        <Route path="/favourite" component={Favourites} exact />
                        <Route path="/tvSeries" component={TvSeries} exact />
                        <Route path="/" component={Home} exact />
                        <Route path="/movie/:movieId" component={Movie} exact />
                        <Route path="/tvSeries/:tvId" component={TvSeriesDetails} exact />
                        <Route path="/actor/:personId" component={ActorDetails} exact />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </React.Fragment>
        </BrowserRouter>
    )
}
export default Routing;