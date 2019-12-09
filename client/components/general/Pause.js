import React from 'react';

import Settings from './../../libraries/SettingsCollection'



export default class Pause extends React.Component {


  pause_playing(){

    var server_details = Settings.find().fetch()

    if( server_details.length > 0){
      var host = server_details[0].ip
      var port = server_details[0].port
    }else{
      return;
    }

    this.props.togglePlayerState("paused")

    $.ajax({
          url: host+":"+port+'/api/v1/command',
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({ command: "pause"})
      });
  }


  render() {
    return (
      <div>

        <img className="controller_icons" src="/images/pause.jpg" onClick={this.pause_playing.bind(this)} />

      </div>
    );
  }
}
