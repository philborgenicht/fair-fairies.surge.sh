import React, { Component } from 'react';

class Message extends Component {
  state = { expanded: false }

  expand = (e,id) =>{
    e.preventDefault()
    this.props.read(id)
    this.setState({expanded: (this.state.expanded ? false : true)})
  }

  render() {
    return (
      <React.Fragment>
      <div className={this.props.message.selected? (this.props.message.read? "row message read selected" : "row message unread selected" ): (this.props.message.read? "row message read unselected" : "row message unread unselected")}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onChange={(e) => this.props.select(e,this.props.message.id)} checked={this.props.message.selected}/>
            </div>
            <div className="col-xs-2">
              <i className={this.props.message.starred? "star fa fa-star" : "star fa fa-star-o"} onClick={()=>this.props.starred(this.props.message.id)} ></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11" >
          {this.props.message.labels.includes('dev')? <span className="label label-warning">dev</span> : ""}
          {this.props.message.labels.includes('gschool')? <span className="label label-warning">gschool</span> : ""}
          {this.props.message.labels.includes('personal')? <span className="label label-warning">personal</span> : ""}
          <small onClick={(e)=>this.expand(e, this.props.message.id)} >
            {this.props.message.subject}
          </small>
        </div>
      </div>
        {this.state.expanded?
        <div className="row message-body">
          <div className="col-xs-11 col-xs-offset-1">
            {this.props.message.body}
          </div>
        </div>
        :""}
      </React.Fragment>
    );
  }
}

export default Message;
