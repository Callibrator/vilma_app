import React from 'react';




export default class Menu_Link extends React.Component {


  render() {
    return (
      <div className="menu_link_container"><a href={this.props.href}>{this.props.image_path?<img className="menu_button_icon" src={this.props.image_path} />:null}<span>{this.props.text}</span></a></div>
    );
  }
}
