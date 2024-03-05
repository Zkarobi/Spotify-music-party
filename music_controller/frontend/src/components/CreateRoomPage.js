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
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.navigate("/room/" + data.code));
  }

  render() {
    return (
      <Grid container spacing={2}> {/* Updated spacing value to match MUI v5 */}

        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">

          <FormControl component="fieldset">
            <FormHelperText>
                <div align="center">
                    Guest Control of Playback State
                </div>
            </FormHelperText>
            <RadioGroup 
                row 
                defaultValue="true" 
                onChange={this.handleGuestCanPauseChange}
            >
                <FormControlLabel 
                  value="true" 
                  control={<Radio color = "primary"/>}
                  label = "Play/Pause"
                  labelPlacement="bottom"
                />
                <FormControlLabel 
                  value="false" 
                  control={<Radio color = "secondary"/>}
                  label = "No Control"
                  labelPlacement="bottom"
                />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
            <FormControl>
                <TextField
                    required={true}
                    type="number"
                    onChange={this.handleVotesChange}
                    defaultValue={this.defaultVotes}
                    inputProps={{
                        min:1,
                        style: {textAlign: "center"}
                    }}
                />
                <FormHelperText>
                    <div align="center">
                        Votes required to skip song
                    </div>
                </FormHelperText>
            </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
            <Button
                color="primary"
                variant="contained"
                onClick={this.handleRoomButtonPressed}
            >
                Create A Room
            </Button>
        </Grid>
        <Grid item xs={12} align="center">
            <Button
                color="secondary"
                variant="contained"
                to="/"
                component={Link}
                onClick={this.handleRoomButtonPressed}
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


