import React from 'react';
import { Tracker } from 'meteor/tracker'


import MusicFolders from './MusicFolders'
import Options from './Options'
import SongsInFolder from "./general/SongsInFolder"
import Controller from "./general/Controller"
import SimpleFooter from "./general/SimpleFooter"



import {Songs,first_run_songs} from './../libraries/SongsCollection.js'
import Settings from './../libraries/SettingsCollection'


import Menu_Sidebar from "./menu_components/Menu_Sidebar"
import Menu_Button from "./menu_components/Menu_Button"


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



export default class App extends React.Component {
  constructor(){
    super()

    this.state = {
      menu_state:"menu_hide",
      player_state:"stopped",
      sync:false
    }

    this.lock_status_request = false;

  }

  togglePlayerState(new_state){

    this.setState({player_state:new_state})

  }

  componentDidMount(){
    Session.set("sync",false)

    //first_run_songs()

    //Setting Up State Timer!



    this.player_status_timer = setInterval(()=>{
      if(!this.lock_status_request){


        this.lock_status_request = true
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
              data: JSON.stringify({ command: "status"}),
              success:(data) => {
                if(data["code"] == 1){

                  if(data["data"]["state"] == "playing"){
                    this.setState({player_state:"playing"})
                  }else{
                    if(data["data"]["list"].length > 0){
                      this.setState({player_state:"paused"})
                    }else{
                      this.setState({player_state:"stopped"})
                    }

                  }
                }
                this.lock_status_request = false
              },
              error:()=>{

                this.setState({player_state:"stopped"})
                this.lock_status_request = false
              }
          });



      }
    },250)


    Tracker.autorun(()=>{
      var sync = Session.get("sync")
      if(sync == true){
        this.setState({sync:true})
      }else{
        this.setState({sync:false})
      }


    })

  }

  open_menu(){

    this.setState({
      menu_state:"menu_show"
    })

  }

  close_menu(){
    this.setState({
      menu_state:"menu_hide"
    })

  }

  render() {
    return ( <Router>
      <Menu_Button menu_function={this.open_menu.bind(this)}/>
      <div className="full_app_container">
      <div className="header_area"></div>
      <div className="main_app_container">
      <div onClick={this.close_menu.bind(this)} className={this.state.menu_state == "menu_hide"?"gray_overaly__hide":"gray_overaly__show"}></div>
      {(this.state.sync == true)?<div className="sync_area"><img src="/images/loading.gif" className="loading_gif" /> </div>:null}
        <Menu_Sidebar menu_function={this.close_menu.bind(this)} menu_state={this.state.menu_state} />

        <Switch>
          <Route path="/options">
            <Options />
          </Route>
          <Route path="/folder/:fid" render={(params)=>{

            return (<div>
                        <SongsInFolder folder={params.match.params.fid} />
                        <Controller player_state={this.state.player_state} />
                        <SimpleFooter />
                    </div>)
          }} />
          <Route path="/">
            <MusicFolders />
            <Controller togglePlayerState={this.togglePlayerState.bind(this)} player_state={this.state.player_state} />
            <SimpleFooter />
          </Route>
        </Switch>
      </div>
      </div>
    </Router>
  )
  }
}
