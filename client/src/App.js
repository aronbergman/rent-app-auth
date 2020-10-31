import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import io from "socket.io-client";
import queryString from 'query-string';
import { withRouter } from "react-router-dom";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import AdminPanel from "./components/board-admin.component";
import RentFilter from "./components/Rent/filter.component";
import CreateAdRent from "./components/Rent/create-ad.component";
import News from "./components/News/News.component";
import SingleRentAd from "./components/Rent/single-rent-ad/single-rent-ad";
import Footer from './components/Footer/footer.component'
import NewsCreator from "./components/Admin/News/NewsCreator/NewsCreator.component";
import SingleNews from "./components/News/SingleNews/SingleNews.component";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Chat from "./components/Messages/Chat/Chat";
import { connect } from "react-redux";
import {
    getUserChatsApi,
    setCounterFromSocket,
    setMessageSocketAction, setStatusRoom
} from "./redux/thunks/chats.thunks";
import { Badge, notification } from "antd";
import SmileOutlined from "@ant-design/icons/lib/icons/SmileOutlined";
import baseUrl from "./baseurl";

let socket;

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            readyToRedirect: null
        };
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('user'))
        const ENDPOINT = baseUrl()
        socket = io(ENDPOINT);

        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: AuthService.getCurrentUser(),
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });

            this.props.getUserChatsApi(userData.id).then(data => {
                data.map(chat => {
                    socket.emit('join', { user: userData.id, room: chat.room }, (error) => {
                        if (error) {
                            alert(error);
                        }
                    });
                });
            }).then(() => {
                socket.on('message', (message) => {
                    const { room } = queryString.parse(window.location.search);
                    if (message.room === room) {
                        this.props.setMessageSocketAction(message)
                    }
                    if (user.id !== message.from) {
                        this.props.setCounterFromSocket(message)
                        notification.info({
                            message: `${message.name}`,
                            description: message.message,
                            placement: 'bottomRight',
                            onClick: () => this.setState({
                                readyToRedirect: `/messages?room=${message.room}`
                            }),
                            icon: <SmileOutlined style={{ color: '#108ee9' }}/>,
                        });
                    }

                    console.log('message in client, finish!', message)
                });
                socket.on('notification', data => {
                    if (data.room) this.props.setStatusRoom(data)
                });
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.readyToRedirect !== null) {
            this.setState({
                readyToRedirect: null
            })
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

        return (
            <Router>
                <div>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">RENT RUSSIA</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <NavLink to="/rent" className="nav-link" activeClassName="active">ЛЕНТА</NavLink>
                                <NavLink to="/news" className="nav-link" activeClassName="active">БЛОГ</NavLink>

                                {(showAdminBoard || showModeratorBoard || currentUser) &&
                                <NavDropdown title='Мой кабинет' id="basic-nav-dropdown">
                                    {currentUser && (
                                        <Link to={"/user"} activeClassName="active" className="dropdown-item">
                                            Мои объявления
                                        </Link>
                                    )}
                                    {currentUser && (
                                        <Link to={"/messages"} activeClassName="active" className="dropdown-item">
                                            Мои сообщения
                                        </Link>
                                    )}

                                    <NavDropdown.Divider/>
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
                                        <Link to={"/profile"} activeClassName="active" className="dropdown-item">
                                            Настройки
                                        </Link>)}
                                </NavDropdown>
                                }
                            </Nav>


                            {currentUser ? (
                                <div className="navbar-nav ml-auto">
                                    {(this.props.allCounterNotRead !== 0) && <li className="nav-item">
                                        <Link to={'/messages'} className="nav-link">Сообщений: <Badge
                                            count={this.props.allCounterNotRead}/></Link>
                                    </li>}
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
                                            ВОЙТИ
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link">
                                            ЗАРЕГИСТРИРОВАТЬСЯ
                                        </Link>
                                    </li>
                                </div>
                            )}
                        </Navbar.Collapse>
                    </Navbar>

                    {
                        this.state.readyToRedirect
                            ? <Redirect to={this.state.readyToRedirect}/>
                            : null
                    }

                    <Switch>
                        <Route exact path={"/"} component={RentFilter}/>

                        <Route exact path={"/rent"} component={RentFilter}/>
                        <Route exact path={"/rent/create-ad"} component={CreateAdRent}/>
                        <Route exact path={"/rent/:id"} component={SingleRentAd}/>

                        <Route exact path={"/news"} component={News}/>
                        <Route exact path={"/news/:id"} component={SingleNews}/>

                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/user" component={BoardUser}/>
                        <Route exact path="/messages" component={Chat}/>
                        <Route exact path="/mod" component={BoardModerator}/>

                        <Route exact path="/admin/news-creator" component={NewsCreator}/>
                        <Route exact path="/admin" component={AdminPanel}/>
                    </Switch>
                </div>
                <Footer/>
            </Router>
        );
    }
}

const mapState = state => ({
    allCounterNotRead: state.chat.allCounterNotRead
})

const mapDispatch = dispatch => ({
    getUserChatsApi: id => dispatch(getUserChatsApi({ id })),
    setMessageSocketAction: message => dispatch(setMessageSocketAction(message)),
    setCounterFromSocket: message => dispatch(setCounterFromSocket(message)),
    setStatusRoom: room => dispatch(setStatusRoom(room))
    // getChatHistory: room => dispatch(getChatHisroty({room})),
    // setChatHistory: data => dispatch(setChatHisroty(data))
})

export default withRouter(connect(mapState, mapDispatch)(App));
