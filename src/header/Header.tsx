import { IconButton, Toolbar, Theme, fade, withStyles, withTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography/Typography';
import LogoIcon from '@material-ui/icons/Stars';
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import IconAvatar from '../Components/IconAvatar';


const styles = withStyles(theme =>(
    {
        menuIcon: {
            marginRight: '10px',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
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
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        appBar: {
            backgroundImage: 'linear-gradient(rgb(255, 224, 148), rgb(244, 173, 0))',
            height: '48px',
            minHeight: '48px',
        },
        toolBar: {
            marginTop: '-9px',
        }
    
    }));

export interface HeaderProps {
    classes?: any;
}
class Header extends Component<HeaderProps, any> {

    constructor(props: HeaderProps){
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar className={classes.toolBar}>
                        <IconButton className={classes.menuIcon}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <LogoIcon />

                        </IconButton>
                        <Typography variant="h6">Firm@</Typography>
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
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <IconAvatar IconName="CreateOutlined"></IconAvatar>
                        <IconAvatar IconName="SendOutlined"></IconAvatar>
                        <IconAvatar IconName="ListAltOutlined"></IconAvatar>
                        <IconAvatar IconName="PeopleAltOutlined"></IconAvatar>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default (styles)(Header);