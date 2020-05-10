import React, {useEffect} from "react";
import {connect} from 'react-redux'
import Loader from "./Loader/Loader";
import UserService from "../services/user.service";
import {fetchRole} from "../redux/reducers/user.reducer";

const AdminPanel = props => {

  const currentUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    UserService.getModeratorBoard().then(response => {
          props.fetchRoleHandler()
        }
    ).catch(() => props.history.push('/profile'));
  }, [])

  return (
      props.loaded ? <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> MODERATOR BOARD, YEEES!
          </h3>
        </header>
      </div> : <Loader/>
  );
}

const mapState = state => ({
  loaded: state.user.loaded
})

const mapDispatch = dispatch => ({
  fetchRoleHandler: () => dispatch(fetchRole(true))
})

export default connect(mapState, mapDispatch)(AdminPanel);