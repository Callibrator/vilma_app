import React from 'react';

import Play from './Play';
import Pause from './Pause';
import Next from './Next';
import Previous from './Previous';


export default class Controller extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      player_state: "none"
    }
  }


  render() {
    if(this.props.player_state == "paused" || this.props.player_state == "playing"){
      return (
        <div className="Controller">

          <Previous />
          {this.props.player_state == "playing"?<Pause togglePlayerState={this.props.togglePlayerState} />:null}
          {this.props.player_state == "paused"?<Play togglePlayerState={this.props.togglePlayerState} />:null}

          <Next />


        </div>
        );
    }else{
      return null
    }

  }
}
