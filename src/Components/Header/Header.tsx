import { Toolbar, withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography/Typography';
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import Button from '../Button';
import CreateSignature from '../../pages/CreateSignature';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { icons } from '../../Assets/icons';


const styles = withStyles(theme => (
    {
        menuIcon: {
            marginRight: '10px',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            marginTop: '3px',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '25px',
            marginTop: '6px'
        },
        inputInput: {
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        appBar: {
            color: 'grey',
            height: '55px',
            minHeight: '55px',
            backgroundColor: 'white'
        },
        toolBar: {
            marginTop: '-9px',
        },
        iconBar: {
            width: '40%',
            display: 'inline-flex',
            listStyleType: 'none'
        },
        iconBarElement: {
            marginTop: '10px',
            marginLeft: '100px',
            fontSize: '18px',
            paddingBottom: '-10px'
        }

    }));

export interface HeaderProps {
    classes?: any;
}

export function BasicExample() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                    <li>
                        <Link to="/send">Send</Link>
                    </li>
                    <li>
                        <Link to="/contacts">Contacts</Link>
                    </li>
                    <li>
                        <Link to="/history">History</Link>
                    </li>
                </ul>
                <hr />

                {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/create">
                        <Create />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function Create() {
    console.log('Create signature')
    return (
        <CreateSignature />
    );
}
class Header extends Component<HeaderProps, any> {

    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar className={classes.toolBar}>
                        <Typography variant="h6">firm@</Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}

                            />
                        </div>
                        <Router>
                            <ul className={classes.iconBar}>
                                <li className={classes.iconBarElement}>
                                    <Link to="/create">
                                        <Button icon={icons.create} text="Create" />
                                    </Link>
                                </li>
                                <li className={classes.iconBarElement}>
                                    <Link to="/send">
                                        <Button icon={icons.send} text="Send" />
                                    </Link>
                                </li>
                                <li className={classes.iconBarElement}>
                                    <Link to="/received">
                                        <Button icon={icons.received} text="Received" />
                                    </Link>
                                </li>
                                <li className={classes.iconBarElement}>
                                    <Link to="/contacts">
                                        <Button icon={icons.contacts} text="Contacts" />
                                    </Link>
                                </li>
                            </ul>
                            <Switch>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route path="/create">
                                    <Create />
                                </Route>
                            </Switch>
                        </Router>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default (styles)(Header);