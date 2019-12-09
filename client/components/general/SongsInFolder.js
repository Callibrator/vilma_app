import React from 'react';

import Settings from './../../libraries/SettingsCollection'
import Songs from './../../libraries/SongsCollection.js'

import Song from './song'

import ReactiveInput from './ReactiveInput'


export default class SongsInFolder extends React.Component {
  constructor(args){
    super(args)



    this.state = {
  //    name:args.name,
      folder:decodeURI(args.folder),
      songs: [],
      search:""
    }

    this.play_folder.bind(this)

  }

  update_search_text(e){
    this.setState({search:e.target.value})
  }

  play_folder(){

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
    Tracker.autorun(()=>{
      var folder = this.state.folder
      var db_songs = Songs.find({folder:folder},{
        sort: { name: 1 }
      }).fetch()


      this.setState({
        songs:db_songs
      })
    })

  }

  render_songs(){

    return this.state.songs.map((elem)=>{

      if(this.state.search.toLowerCase().trim() == ""){
        return <Song key={elem.name} name={elem.name} folder={elem.folder} />
      }else{
        if(elem.name.toLowerCase().trim().includes(this.state.search.toLowerCase().trim())){
          return <Song key={elem.name} name={elem.name} folder={elem.folder} />
        }
      }



    })
  }


  render() {
    return (
      <div>
        <ReactiveInput image="/images/search.png" value={this.state.search} onChange={this.update_search_text.bind(this)} placeholder="Folder Name" />
        {this.render_songs()}

      </div>
    );
  }
}
