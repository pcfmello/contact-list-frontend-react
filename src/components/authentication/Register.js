import React from "react";
import PropTypes from 'prop-types';
import { Paper, TextField, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import API from "../../api";

const styles = theme => ({
      root: {
        display: "flex",
        position: "absolute",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        top: "50%",
        left: "50%",
        height: "70%",
        transform: "translate(-50%,-50%)", 
      },
      paper: {
        width: 240, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        padding: "24px"
      },
      textField: {
          marginTop: 0
      }
});

const handleRegister = async () => {
    console.log("Registrering...");
    const resp = await API.post("/auth/register", {
        name: "Paulo Cesar", email: "pcfmello@gmail.com", password: "senha123"
    });
    console.log("resp", resp);
}

const Register = ({ classes }) => (
    <div className={ classes.root }>
        <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>Sign in</Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    id="username"
                    className={classes.textField}
                    label="Username"
                    // value={this.state.username}
                    // onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="password"
                    label="Password"
                    className={classes.textField}
                    // value={this.state.password}
                    // onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <Button type="submit" variant="contained" size="large" color="primary" fullWidth>
                    Send
                </Button>

            </form>
        </Paper>
    </div>
);

Register.propTypes = {
    classes: PropTypes.object
}

export default withStyles(styles)(Register);
