import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Room() {
  // Initialize state using useState hook
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  // Extract roomCode from URL parameters using useParams hook
  const { roomCode } = useParams();
  useEffect(() => {
    const getRoomDetails = () => {
      fetch("/api/get-room" + "?code=" + roomCode) // Use roomCode from useParams
        .then((response) => response.json())
        .then((data) => {
          setRoomDetails({
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guest_can_pause,
            isHost: data.is_host,
          });
        })
        .catch((error) => console.error("Error:", error));
    };

    getRoomDetails();
  }, [roomCode]); // Dependency array, re-run effect if roomCode changes

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {roomDetails.votesToSkip}</p>
      <p>Guest can pause: {roomDetails.guestCanPause.toString()}</p>
      <p>Host: {roomDetails.isHost.toString()}</p>
    </div>
  );
}

export default Room;
