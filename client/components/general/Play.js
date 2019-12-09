import React from 'react';

import Settings from './../../libraries/SettingsCollection'



export default class Play extends React.Component {


  resume_playing(){

    var server_details = Settings.find().fetch()

    if( server_details.length > 0){
      var host = server_details[0].ip
      var port = server_details[0].port
    }else{
      return;
    }

    this.props.togglePlayerState("playing")


    $.ajax({
          url: host+":"+port+'/api/v1/command',
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({ command: "resume"})
      });
  }

  render() {
    return (
      <div>

        <img className="controller_icons" src="/images/play.png" onClick={this.resume_playing.bind(this)} />

      </div>
    );
  }
}
