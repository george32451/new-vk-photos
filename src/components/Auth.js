import React, { Component } from 'react';
import { Photos } from "./Photos";

class Auth extends Component {
    state = {
        id: null,
        username: '',
    };
    render() {
        const { username, id } = this.state;
        return (
            <React.Fragment>
                {username.trim() ? <p>Добро пожаловать, {username}</p> : <p>Авторизуйтесь</p>}
                {id !== null ? <button className="btn btn-primary float-right" onClick={this.handleLogout}>выйти</button> : null}
                {username.trim() ? <Photos /> : <button className="btn btn-primary" onClick={this.handleLoginClick}>Войти</button>}
            </React.Fragment>
        );
    }
    handleLoginClick = () => {
        //eslint-disable-next-line no-undef
        VK.Auth.login(this.authInfo,4)
    };

    handleLogout = () => {
        //eslint-disable-next-line no-undef
        VK.Auth.logout();
        this.setState({
            id: null,
            username: '',
        })
    };


    authInfo = (response) => {
        if (response.session) {
            this.setState({
                username: response.session.user.first_name,
                id: response.session.user.id,
            })
        } else {
            console.log('not auth');
        }
    }
}

export { Auth }