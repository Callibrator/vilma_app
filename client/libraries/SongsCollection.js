import Settings from './SettingsCollection'

const Songs = new Ground.Collection('Songs');

export function first_run_songs(){
  if (Songs.find().count() <= 0){
    sync_songs()
  }

}
export function sync_songs(){


  var server_details = Settings.find().fetch()



  if( server_details.length > 0){
    var host = server_details[0].ip
    var port = server_details[0].port
  }else{
    return;
  }

  Session.set("sync",true);

  $.ajax({
              url: host+":"+port+'/api/v1/command',
              type: 'post',
              dataType: 'json',
              contentType: 'application/json',
              success:(data) => {
                Songs.remove({})
                Songs.clear()




                for(i=0;i<data["data"].length;i++){
                  var d = data["data"][i].replace(/\//g,"\\")
                  song_name = d

                  song_folder = d.split("\\").slice(0, -1).join("\\")
                  song_folder_name = song_folder.split("\\").pop()

                  song_name_only = song_name.split("\\").pop().split(".")[0]

                  song = {
                    "name": song_name,
                    "folder": song_folder,
                    "folder_name":song_folder_name,
                    "song_name":song_name_only

                  }



                  Songs.insert(song)

                }

                while(Songs.find().count() < i){
                  //Do Nothing!

                }




              },
              complete:()=>{
                Session.set("sync",false);
              },


              data: JSON.stringify({ command: "get_songs"})
          });

}

export default Songs
