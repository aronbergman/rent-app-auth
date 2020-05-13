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
import AdminPanel from "./components/board-admin.component";
import RentFilter from "./components/Rent/filter.component";
import CreateAdRent from "./components/Rent/create-ad.component";
import DatingHomePage from "./components/Dating/DatingHomePage.component";
import DatingList from "./components/Dating/single-category/DatingList.component";
import News from "./components/News/News.component";
import SingleRentAd from "./components/Rent/single-rent-ad/single-rent-ad";
import Footer from './components/Footer/footer.component'
import NewsCreator from "./components/Admin/News/NewsCreator/NewsCreator.component";
import SingleNews from "./components/News/SingleNews/SingleNews.component";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

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
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">#bergmanbar</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <NavLink to="/rent" className="nav-link" activeClassName="active">АРЕНДА</NavLink>
                                <NavLink to="/dating" className="nav-link" activeClassName="active">ЗНАКОМСТВА</NavLink>
                                <NavLink to="/news" className="nav-link" activeClassName="active">НОВОСТИ</NavLink>

                                {(showAdminBoard || showModeratorBoard || currentUser) &&
                                <NavDropdown title="МОЙ ПРОФИЛЬ" id="basic-nav-dropdown">
                                    {showAdminBoard && (
                                        <Link to={"/admin"} activeClassName="active" className="dropdown-item">
                                            Admin Board
                                        </Link>
                                    )}
                                    {showModeratorBoard && (
                                        <Link to={"/mod"} activeClassName="active" className="dropdown-item">
                                            Moderator Board
                                        </Link>
                                    )}
                                    {currentUser && (
                                        <Link to={"/user"} activeClassName="active" className="dropdown-item">
                                            Мои объявления
                                        </Link>
                                    )}
                                    <NavDropdown.Divider/>
                                    {currentUser && (
                                        <Link to={"/profile"} activeClassName="active" className="dropdown-item">
                                            Настройки
                                        </Link>)}
                                </NavDropdown>}
                            </Nav>


                            {currentUser ? (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link">{currentUser.username}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link"
                                           onClick={this.logOut}>Выйти</a>
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
                        </Navbar.Collapse>
                    </Navbar>


                    {/*<nav className="navbar navbar-expand navbar-dark bg-dark">*/}
                    {/*    <Link to={"/"} className="navbar-brand">*/}
                    {/*        /!*<img src="http://localhost:8080/favicon.png" alt=""/>*!/*/}
                    {/*        COMMUNITY*/}
                    {/*    </Link>*/}
                    {/*    <div className="navbar-nav mr-auto">*/}

                    {/*        <li className="nav-item">*/}
                    {/*            <NavLink to="/rent" className="nav-link" activeClassName="active">АРЕНДА</NavLink>*/}
                    {/*        </li>*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <NavLink to="/dating" className="nav-link" activeClassName="active">ЗНАКОМСТВА</NavLink>*/}
                    {/*        </li>*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <NavLink to="/news" className="nav-link" activeClassName="active">НОВОСТИ</NavLink>*/}
                    {/*        </li>*/}
                    {/*        /!*<li className="nav-item">*!/*/}
                    {/*        /!*    <NavLink to="/questions" className="nav-link" activeClassName="active">ВОПРОСЫ И ОТВЕТЫ</NavLink>*!/*/}
                    {/*        /!*</li>*!/*/}
                    {/*        /!*<li className="nav-item">*!/*/}
                    {/*        /!*    <NavLink to="/shop" className="nav-link" activeClassName="active">МАГАЗИН</NavLink>*!/*/}
                    {/*        /!*</li>*!/*/}

                    {/*        {showModeratorBoard && (*/}
                    {/*            <li className="nav-item">*/}
                    {/*                <Link to={"/mod"} className="nav-link">*/}
                    {/*                    Moderator Board*/}
                    {/*                </Link>*/}
                    {/*            </li>*/}
                    {/*        )}*/}

                    {/*        {showAdminBoard && (*/}
                    {/*            <li className="nav-item">*/}
                    {/*                <Link to={"/admin"} className="nav-link">*/}
                    {/*                    Admin Board*/}
                    {/*                </Link>*/}
                    {/*            </li>*/}
                    {/*        )}*/}

                    {/*        {currentUser && (*/}
                    {/*            <li className="nav-item">*/}
                    {/*                <Link to={"/user"} className="nav-link">*/}
                    {/*                    МОЙ ПРОФИЛЬ*/}
                    {/*                </Link>*/}
                    {/*            </li>*/}
                    {/*        )}*/}
                    {/*    </div>*/}

                    {/*    {currentUser ? (*/}
                    {/*        <div className="navbar-nav ml-auto">*/}
                    {/*            <li className="nav-item">*/}
                    {/*                <Link to={"/profile"} className="nav-link">*/}
                    {/*                    Настройки {currentUser.username}*/}
                    {/*                </Link>*/}
                    {/*            </li>*/}
                    {/*            <li className="nav-item">*/}
                    {/*                <a href="/login" className="nav-link" onClick={this.logOut}>*/}
                    {/*                    Выйти*/}
                    {/*                </a>*/}
                    {/*            </li>*/}
                    {/*        </div>*/}
                    {/*    ) : (*/}
                    {/*        <div className="navbar-nav ml-auto">*/}
                    {/*            <li className="nav-item">*/}
                    {/*                <Link to={"/login"} className="nav-link">*/}
                    {/*                    Вход*/}
                    {/*                </Link>*/}
                    {/*            </li>*/}

                    {/*            <li className="nav-item">*/}
                    {/*                <Link to={"/register"} className="nav-link">*/}
                    {/*                    Регистрация*/}
                    {/*                </Link>*/}
                    {/*            </li>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</nav>*/}


                    <Switch>
                        <Route exact path={"/"} component={Home}/>

                        <Route exact path={"/rent"} component={RentFilter}/>
                        <Route exact path={"/rent/create-ad"} component={CreateAdRent}/>
                        <Route exact path={"/rent/:id"} component={SingleRentAd}/>

                        <Route exact path={"/dating"} component={DatingHomePage}/>
                        <Route exact path={"/dating/:id"} component={DatingList}/>

                        <Route exact path={"/news"} component={News}/>
                        <Route exact path={"/news/:id"} component={SingleNews}/>

                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/user" component={BoardUser}/>
                        <Route path="/mod" component={BoardModerator}/>

                        <Route path="/admin/news-creator" component={NewsCreator}/>
                        <Route path="/admin" component={AdminPanel}/>
                    </Switch>
                </div>
                <Footer/>
            </Router>
        );
    }
}

export default App;
