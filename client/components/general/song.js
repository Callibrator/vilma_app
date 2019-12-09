import React from 'react';

import Settings from './../../libraries/SettingsCollection'


export default class Song extends React.Component {
  constructor(args){
    super(args)

    var song_name = args.name.split("\\").pop();
    song_name = song_name.split(".")[0]
    this.state = {
      name:args.name,
      song_name:song_name,
      folder:args.folder
    }



    this.play_song.bind(this)

  }

  play_song(){

    var server_details = Settings.find().fetch()

    if( server_details.length > 0){
      var host = server_details[0].ip
      var port = server_details[0].port
    }else{
      return;
    }

    var song_name = this.state.name
    $.ajax({
          url: host+":"+port+'/api/v1/command',
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({ command: "play_song",song_location: song_name})
      });
  }

  componentDidMount(){

  }
  render() {
    return (
      <div className="foder_info">
        <span>{this.state.song_name}</span>
        <div className="foder_info__options_container">
          <img className="foder_info__play_image" src="/images/play_icon.png" onClick={this.play_song.bind(this)} />
        </div>

      </div>
    );
  }
}
