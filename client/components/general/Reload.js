import React from 'react';


import {Songs,sync_songs} from './../../libraries/SongsCollection.js'



export default class Reload extends React.Component {
  constructor(args){
    super(args)




    this.reload_songs.bind(this)

  }

  reload_songs(){
    sync_songs()

  }

  componentDidMount(){

  }
  render() {
    return (
      <div>
        <button onClick={this.reload_songs.bind(this)}>Reload</button>

      </div>
    );
  }
}
