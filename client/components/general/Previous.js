import React from 'react';

import Settings from './../../libraries/SettingsCollection'



export default class Previous extends React.Component {


  play_previous(){

    var server_details = Settings.find().fetch()

    if( server_details.length > 0){
      var host = server_details[0].ip
      var port = server_details[0].port
    }else{
      return;
    }


    $.ajax({
          url: host+":"+port+'/api/v1/command',
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({ command: "previous"})
      });
  }


  render() {
    return (
      <div>

        <img className="controller_icons" src="/images/arrow_left_1.png" onClick={this.play_previous.bind(this)} />

      </div>
    );
  }
}
