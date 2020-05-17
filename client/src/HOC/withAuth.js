import React from 'react';
import UserService from "../services/user.service";
import {Redirect} from "react-router-dom";
import {ADMIN, MODERATOR, USER} from "../constants/roles.constants";
import {connect} from "react-redux";
import {setRole} from "../redux/thunks/user.thunks";

export default function withAuth(WrappedComponent, role) {
    class Authenticate extends React.Component {

        getUser = () => JSON.parse(localStorage.getItem('user'));

        componentDidMount() {
            switch (role) {
                case ADMIN:
                    return UserService.getAdminBoard().then(() => {
                            this.props.setRole({
                                userData: this.getUser(),
                                isAuthenticated: true,
                                role: ADMIN
                            })
                        }
                    ).catch(() => {
                        this.props.setRole({
                            isAuthenticated: false,
                            role: null
                        })
                    });
                case MODERATOR:
                    return UserService.getModeratorBoard().then(() => {
                            this.props.setRole({
                                userData: this.getUser(),
                                isAuthenticated: true,
                                role: MODERATOR
                            })
                        }
                    ).catch(() => {
                        this.props.setRole({
                            isAuthenticated: false,
                            role: null
                        })
                    });
                case USER:
                    return UserService.getUserBoard().then(() => {
                            this.props.setRole({
                                userData: this.getUser(),
                                isAuthenticated: true,
                                role: USER
                            })
                        }
                    ).catch(() => {
                        this.props.setRole({
                            isAuthenticated: false,
                            role: null
                        })
                    });
                default:
                    this.props.setRole({
                        isAuthenticated: false,
                        role: 'Role not found'
                    })
            }
        }

        render() {
            return (
                this.props.isAuthenticated !== null ? this.props.isAuthenticated ?
                    <WrappedComponent {...this.props} /> : <Redirect to={'/'}/> : null
            );
        }
    }

    const mapState = state => ({
        isAuthenticated: state.user.isAuthenticated,
        role: state.user.role
    })

    const mapDuspatch = dispatch => ({
        setRole: e => dispatch(setRole(e))
    })

    return connect(mapState, mapDuspatch)(Authenticate)
}

