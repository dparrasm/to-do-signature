import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import User from '../User/User';
import { Avatar, Button } from '@material-ui/core';
import pdfIcon from './pdfIcon.png';

const styles = withStyles({
    container: {
        backgroundColor: "white",
        padding: "10px 10px 10px 10px",
        borderStyle: "solid" as "solid",
        borderColor: "#e0e0de",
        borderWidth: "1px",
        borderRadius: "15px 15px 15px 15px",
        
    },
    form: {
        paddingTop: "5px"
    },
    document: {
        marginRight: "20px",
        marginLeft: "20px",
        width: "55px",
        height: "55px"
    },
    title: {
        marginTop: "0px",
        fontSize: "larger"
    },
    date: {
        marginTop: "-10px",
        fontSize: "small",
        paddingBotom: "30px"
    },
    info: {
        display: "flex",
        flexDirection: "row"
    },
    options: {
        marginTop: "15px",
        borderTopStyle: "solid" as "solid",
        borderColor: "#e0e0de",
        borderWidth: "1px",
        paddingTop: "2px"
    },
    button: {
        marginLeft: "5px"
    },
    documentInfo:{
        display: "flex",
        flexDirection: "row"
    },
    avatar: {
        height: "25px",
        width: "25px",
        marginLeft: "20px",
        fontSize: "smaller" as "smaller",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    } 
});
interface DetailedSignProps {
    classes: any;
}
interface state {
    user: typeof User;
}
class DetailedSign extends Component<DetailedSignProps, state>{

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <form className={classes.form}>
                    <div className={classes.info}>
                        <img alt="document" className={classes.document} src={pdfIcon} />
                        <div className={classes.documentInfo}>
                            <div>
                            <h1 className={classes.title}>Título del documento</h1>
                            <h2 className={classes.date}>06/02/2021</h2>
                            </div>
                            <div>
                            <Avatar  className = {classes.avatar}>D</Avatar>
                            </div>
                        </div>
                    </div>
                    <div className={classes.options}>
                        <Button color="primary" className={classes.button}>Sign</Button>
                        <Button color="primary" className={classes.button}>Send</Button>
                        <Button color="primary" className={classes.button}>Download</Button>
                        <Button
                            color="secondary"
                            className={classes.button}
                        >
                            Delete
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default styles(DetailedSign);