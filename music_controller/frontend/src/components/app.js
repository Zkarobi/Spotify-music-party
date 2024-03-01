import React, { Component } from "react";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

export default class App extends Component{
    
    render(){
        return (<div>
        <HomePage />
        <CreateRoomPage/>
        <RoomJoinPage/>
        </div>  
        )

    }
}
