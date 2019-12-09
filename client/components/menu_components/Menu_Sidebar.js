import React from 'react';


import Menu_Link from "./Menu_Link"
import Menu_Sound_Volume from "./Menu_Sound_Volume"
import {sync_songs} from './../../libraries/SongsCollection.js'


export default class Menu_Sidebar extends React.Component {
  constructor(props){
    super(props)

  }


  sync_songs_click(){
    sync_songs()
  }

  render() {
    return (
      <div className={(this.props.menu_state == "menu_show")?"menu_sidebar menu_show":"menu_sidebar menu_hide"}>
        <h2 className="menu_header">VILMA</h2>
        <Menu_Link image_path="/images/folder_icon.png" href="/" text="Folders" />
        <div className="menu_link_container"><a href="#" onClick={this.sync_songs_click.bind(this)}><img className="menu_button_icon" src="/images/reload.png" /><span>ReSync</span></a></div>
        <Menu_Link image_path="/images/gear.png" href="/options" text="Options" />
        <div className="menu_link_container"><a href="#" onClick={this.props.menu_function}><img className="menu_button_icon" src="/images/x.png" /><span> Close</span></a></div>
        <Menu_Sound_Volume />



      </div>
    );
  }
}
