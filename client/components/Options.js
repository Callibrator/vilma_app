import React from 'react';
import { Tracker } from 'meteor/tracker'


import Settings from './../libraries/SettingsCollection.js'


export default class Options extends React.Component {
  constructor(){
    super()

    this.save_data.bind(this)

    //Refs
    this.server_settings = React.createRef();

    //state
    this.state = {
      "host":"http://192.168.1.1",
      "port": 80
    }
  }

  componentDidMount(){
    Tracker.autorun(()=>{
      var server_details = Settings.find().fetch()
      if(server_details.length > 0){
        server_details = server_details[0]
        var host = server_details.ip
        var port = server_details.port
        if(host == undefined){
          host = "192.168.1.1"
        }

        if(port == undefined){
          port = 2000
        }
        this.setState({
          host:host,
          port:port
        })
      }

    })

  }

  save_data(){
    var ip = this.state.host
    var port = this.state.port


    if (Settings.find().count() == 0){
      Settings.insert({
        ip:ip,
        port:port
      })

    }else{
      Settings.update({},{
        ip:ip,
        port:port
      })
    }


  }

  render() {
    return (
      <div className="main_app_container">
        <form name="server_settings" ref={this.server_settings}>
          <h3>Server Details</h3>
          <label><span>IP</span><input onChange={(e)=>{this.setState({host:e.target.value})}} value={this.state.host} type="text" name="host" /></label>
          <label><span>Port</span><input onChange={(e)=>{this.setState({port:e.target.value})}} value={this.state.port} type="number" step="1" name="port" /></label>
        </form>



        <a href="#" className="save_button_options" onClick={this.save_data.bind(this)}>Save</a>
      </div>
    );
  }
}
