import React, { Component } from 'react'
import fire from '../config/fire';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import "./styles/login.css"
import API from "../utils/API"

const loginButton ={
    backgroundColor: '#1877f2',
    width: '48%',
    marginLeft:"25%",
    color: '#FFFFFF'
}

const signupButton ={
    backgroundColor: '#42B72A',
    width: '100%',
    color: '#FFFFFF'
}

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }
    login = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            // console.log(u.user.uid);

        }).catch((err) => {
            console.log(err)
        })
    }

    signup = (e) => {
        e.preventDefault();

        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log(u.user.uid);
            API.createUser( {
                id: u.user.uid,
                savings:{}
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <Grid container spacing={3}>
                <Grid item sm={12}>
                <Card  variant="outlined" className="card login">
                    <CardContent>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="enter email address"
                            onChange={this.handleChange}
                            value={this.state.email}
                            className="input"
                        />
                        <input
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            id="password"
                            placeholder="enter password"
                            value={this.state.password}
                            className="input"
                        />
                        <Button style={loginButton} onClick={this.login} size="small">Login</Button>
                    </CardContent>
                    <CardActions>
                        <Button style={signupButton} onClick={this.signup} size="small">Signup</Button>
                    </CardActions>
                </Card>
                </Grid>
            </Grid>
        )
    }
}
