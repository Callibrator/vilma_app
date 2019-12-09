import React from 'react';

import Settings from './../../libraries/SettingsCollection'
import Songs from './../../libraries/SongsCollection.js'



export default class Folder extends React.Component {
  constructor(args){
    super(args)

    this.state = {
      "name":args.name,
      "folder":args.folder
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


    var songs_list = Songs.find({folder:this.state.folder}).fetch()
    var song_names = []

    for(var i=0;i<songs_list.length;i++){
      song_names.push(songs_list[i].name)
    }




    $.ajax({
          url: host+":"+port+'/api/v1/command',
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({ command: "play_song",song_location: song_names})
      });
  }

  componentDidMount(){

  }
  go_to_folder(){
    window.location.href = "/folder/"+encodeURI(this.state.folder)
  }
  render() {
    return (
      <div className="foder_info">
        <span>{this.state.name}</span>
        <div className="foder_info__options_container">
          <img className="foder_info__folder_image" src="/images/folder_icon.png" onClick={this.go_to_folder.bind(this)} />
          <img className="foder_info__play_image" src="/images/play_icon.png" onClick={this.play_song.bind(this)} />
        </div>
      </div>
    );
  }
}
