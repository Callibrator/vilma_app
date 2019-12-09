import React from 'react';
import { Tracker } from 'meteor/tracker'


import Songs from './../libraries/SongsCollection.js'

import Folder from './general/Folder'
import ReactiveInput from './general/ReactiveInput'



export default class MusicFolders extends React.Component {
  constructor(){
    super()

    this.state = {
      folders:[],
      search:""
    }

    this.render_folders.bind(this)
  }

  componentDidMount(){

    Session.set("search",this.state.search)

    Tracker.autorun(()=>{

      var search = Session.get("search").toLowerCase().trim();


      if(search == ""){
        var db_folders = Songs.find({},{
          sort: { name: 1 }
        }).fetch()
      }else{

        var db_folders = Songs.find({folder:{$regex:search,$options:"i"}},{
          sort: { name: 1 }
        }).fetch()

      }

      var folders = []
      var folder_name = ""
      var actual_data = []

      for(var i=0;i < db_folders.length;i++){
        folder_name = db_folders[i].folder.split("\\").pop();
        if(folders.includes(folder_name) == false){
          folders.push(folder_name)
          actual_data.push({
            name: db_folders[i].folder_name,
            folder:db_folders[i].folder
          })
        }
      }

      this.setState({
        folders:actual_data,

      })


    })

  }

  update_search_text(e){
    this.setState({search:e.target.value})
    Session.set("search",e.target.value)
  }

  render_folders(){

    return this.state.folders.map((elem)=>{


      /*if(this.state.search.toLowerCase().trim() == ""){
        return <Folder key={elem.name} name={elem.name} folder={elem.folder} />
      }else{
        if(elem.name.toLowerCase().trim().includes(this.state.search.toLowerCase().trim())){
          return <Folder key={elem.name} name={elem.name} folder={elem.folder} />
        }
      }*/

      return <Folder key={elem.name} name={elem.name} folder={elem.folder} />



    })
  }

  render() {
    return (
      <div>
        <ReactiveInput image="/images/search.png" value={this.state.search} onChange={this.update_search_text.bind(this)} placeholder="Folder Name" />
        {this.render_folders()}

      </div>
    );
  }
}
