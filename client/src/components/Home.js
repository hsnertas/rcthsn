import React, { Component, useContext, useState, useEffect } from 'react'
import fire from '../config/fire'
import Form from './Form';
import Summary from './Summary';
import Table from './Table';
import IncExpTable from './IncExpTable'
import Transaction from './Transaction'
import GoalProgress from './GoalProgress'
import API from '../utils/API';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import UserContext from './UserContext'
import GoalForm from './GoalForm'
import BackgroundCircles from './BackgroundCircles'
import Button from '@material-ui/core/Button';
import './styles/style.css'




export default function Home() {

    const [user, setUser] = React.useState({
        inc_exp: [],
        savings: {},
        userId: ""
    });

    const authUser = useContext(UserContext);

    const logout = (e) => {
        e.preventDefault();
        fire.auth().signOut();
        // alert();
    }
    const test = () =>{
        alert("cleared")
    }

    useEffect(() => {
        const id = authUser ? authUser.uid : "";
        API.getBudgetData(id).then(response => {
            if (!response.data) { console.log("error") } else {
                setUser({
                    inc_exp: response.data.inc_exp,
                    savings: response.data.savings,
                    userId: id
                })
            }
        })
    });

    const credits = () => {

        let inc_exp = user.inc_exp;

        let totalIncome = inc_exp.reduce((preVal, curItem) => {
            if (curItem.amount > 0) {
                return preVal += curItem.amount;
            } else {
                return preVal;
            }
        }, 0);

        return totalIncome;
    }

    const debits = () => {

        let inc_exp = user.inc_exp;

        return inc_exp.reduce((preVal, curItem) => {
            if (curItem.amount < 0) {
                return preVal += curItem.amount;
            } else {
                return preVal;
            }
        }, 0);
    }

    const balance = () => {
        return credits() + debits();
    }



    return (
        // <Background>
        // <div style={{backgroundColor: "red"}}>
        <div className="area" >
            <BackgroundCircles />
            <Button variant="contained" color="secondary" onClick={logout}> Logout</Button>
            <div className="container">

                <h2 style={{ textAlign: "center" }}>Quick Save</h2>

                <br />

                <div className="row mb-3">
                    <Grid container spacing={2}>
                        <Grid item md={4}>
                            <Summary text="Income" type="success" amount={`$ ${credits()}`} />
                        </Grid>
                        <Grid item md={4}>
                            <Summary text="Expenses" type="danger" amount={`$ ${debits()}`} />
                        </Grid>
                        <Grid item md={4}>
                            <Summary text="Saved" type="info" amount={`$ ${balance()}`} />
                        </Grid>
                    </Grid>
                </div>
                <br />

                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <Grid>
                            <Grid item>
                                <Transaction
                                    userId={user.userId} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4}>
                        <Grid>
                            <Grid item>
                                <GoalProgress
                                    saved={balance()}
                                    savings={user.savings}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4}>
                        <Grid>
                            <Grid item>
                                <GoalForm
                                    goal={user.savings}
                                    balance={balance()}
                                    userId={user.userId}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <hr />
                <br />

                <IncExpTable
                    inc_exp={user.inc_exp}
                />
            </div>
        </div>
    );
}
