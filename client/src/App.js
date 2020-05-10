import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link, NavLink} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import RentFilter from "./components/Rent/filter.component";
import CreateAdRent from "./components/Rent/create-ad.component";
import LoveFilter from "./components/Love/LoveFilter.component";
import News from "./components/News/News.component";
import SingleRentAd from "./components/Rent/single-rent-ad/single-rent-ad";
import Footer from './components/Footer/footer.component'

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: AuthService.getCurrentUser(),
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const {currentUser, showModeratorBoard, showAdminBoard} = this.state;

        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            {/*<img src="http://localhost:8080/favicon.png" alt=""/>*/}
                            COMMUNITY
                        </Link>
                        <div className="navbar-nav mr-auto">

                            <li className="nav-item">
                                <NavLink to="/rent" className="nav-link" activeClassName="active">АРЕНДА</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/love" className="nav-link" activeClassName="active">ЗНАКОМСТВА</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/news" className="nav-link" activeClassName="active">НОВОСТИ</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/questions" className="nav-link" activeClassName="active">ВОПРОСЫ И ОТВЕТЫ</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/shop" className="nav-link" activeClassName="active">МАГАЗИН</NavLink>
                            </li>

                            {/*{showModeratorBoard && (*/}
                            {/*    <li className="nav-item">*/}
                            {/*        <Link to={"/mod"} className="nav-link">*/}
                            {/*            Moderator Board*/}
                            {/*        </Link>*/}
                            {/*    </li>*/}
                            {/*)}*/}

                            {/*{showAdminBoard && (*/}
                            {/*    <li className="nav-item">*/}
                            {/*        <Link to={"/admin"} className="nav-link">*/}
                            {/*            Admin Board*/}
                            {/*        </Link>*/}
                            {/*    </li>*/}
                            {/*)}*/}

                            {/*{currentUser && (*/}
                            {/*    <li className="nav-item">*/}
                            {/*        <Link to={"/user"} className="nav-link">*/}
                            {/*            User*/}
                            {/*        </Link>*/}
                            {/*    </li>*/}
                            {/*)}*/}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>
                                        Выйти
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Вход
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Регистрация
                                    </Link>
                                </li>
                            </div>
                        )}
                    </nav>

                    <div className="container">
                        <Switch>
                            <Route exact path={"/"} component={Home}/>

                            <Route exact path={"/rent"} component={RentFilter}/>
                            <Route exact path={"/rent/create-ad"} component={CreateAdRent}/>
                            <Route exact path={"/rent/:id"} component={SingleRentAd}/>

                            <Route exact path={"/love"} component={LoveFilter}/>
                            {/*<Route exact path={"/rent/create-ad"} component={CreateAdLove}/>*/}

                            <Route exact path={"/news"} component={News}/>

                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route path="/user" component={BoardUser}/>
                            <Route path="/mod" component={BoardModerator}/>
                            <Route path="/admin" component={BoardAdmin}/>
                        </Switch>
                    </div>
                </div>
                <Footer/>
            </Router>
        );
    }
}

export default App;
