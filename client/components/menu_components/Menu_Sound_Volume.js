import React from 'react';

import Settings from './../../libraries/SettingsCollection'


export default class Menu_Sound_Volume extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      volume:50
    }
  }

  changeVolume(e){
    this.setState({volume:e.target.value})

    this.request_volume()
  }

  request_volume(){
    
    var server_details = Settings.find().fetch()

    if( server_details.length > 0){
      var host = server_details[0].ip
      var port = server_details[0].port
    }else{
      this.lock_status_request = false
      return

    }

    $.ajax({
          url: host+":"+port+'/api/v1/command',
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({ command: "volume", value:this.state.volume})
    })
  }

  render() {
    return (
      <div className="menu_link_container"><img className="menu_button_icon" src="/images/speaker.png" /><input type="range" min="1" max="100" onChange={this.changeVolume.bind(this)} value={this.state.volume}/></div>


    );
  }
}
