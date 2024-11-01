import React, { Component } from "react";
// Update import paths to use the new MUI version 5 package
import { useNavigate } from 'react-router-dom'; // Make sure this import is included
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";


class CreateRoomPageComponent extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleBackButtonPressed = this.handleBackButtonPressed.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  handleRoomButtonPressed() {
    event.preventDefault();  // Ensure the form does not refresh the page

    console.log("Create Room button clicked");
    const requestOptions = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
     },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())

      .then((data) => this.props.navigate("/room/" + data.code));
  }

  handleBackButtonPressed(event) {
    event.preventDefault();
    console.log("Back button clicked");
    this.props.navigate("/"); // Navigate to homepage
  }

  render() {
    console.log("CreateRoomPageComponent is rendering"); // Check if the component is rendering

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <Typography variant="body2" align="center">
                Guest Control of Playback State
              </Typography>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={this.handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required
              type="number"
              onChange={this.handleVotesChange}
              defaultValue={this.defaultVotes}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <Typography variant="body2" align="center">
                Votes required to skip song
              </Typography>
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <form onSubmit={this.handleRoomButtonPressed}>
            <Button
              color="primary"
              variant="contained"
              type="submit" // Ensure it triggers form submission explicitly
            >
              Create A Room
            </Button>
          </form>
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            color="secondary"
            variant="contained"
            onClick={this.handleBackButtonPressed}
            type="button"
          >
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}


  // Wrapper function that uses the useNavigate hook
function CreateRoomPage(props) {
  const navigate = useNavigate();

  return <CreateRoomPageComponent {...props} navigate={navigate} />;
}

export default CreateRoomPage;


