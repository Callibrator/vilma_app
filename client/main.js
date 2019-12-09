import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import './main.html';



import App from './components/app'
import Options from './components/Options'
import MusicFolders from './components/MusicFolders'



Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
});
