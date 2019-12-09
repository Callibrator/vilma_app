import React from 'react';




export default class ReactiveInput extends React.Component {
  constructor(props){
    super(props)
  }


  render() {

    return (
      <label className="reactiveArea__container">

          <input className="reactiveArea" type="text" value={this.props.value} onChange={this.props.onChange} placeholder={this.props.placeholder} />
          {this.props.image?<img src={this.props.image} className="reactiveArea__image" />:null}

      </label>
    )

  }
}
