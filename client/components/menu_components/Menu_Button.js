import React from 'react';




export default class Menu_Button extends React.Component {


  render() {
    return (
      <div className="menu_button_container">

        <img className="menu_button" src="/images/menu_icon.png" onClick={this.props.menu_function} />

      </div>
    );
  }
}
