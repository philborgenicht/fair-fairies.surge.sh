import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Toolbar extends Component {

  anyChecked = () =>{
    return this.props.messages? this.props.messages.filter(message => message.selected).length>0? true : false : false
  }

  allChecked = () =>{
    return this.props.messages? this.props.messages.filter(message => message.selected).length === this.props.messages.length? true : false : false
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <Link className="btn btn-danger" to={this.props.isComposing? "/messages" : "/composer" } onClick={this.props.toggleComposer}>
            <i className={this.props.isComposing? "fa fa-minus" : "fa fa-plus"} ></i>
          </Link>

          <p className="pull-right">
            <span className="badge badge">{this.props.messages? this.props.messages.filter((message)=> !message.read).length : ''}</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={this.anyChecked()? this.props.unSelectAll : this.props.selectAll }>
            <i className={this.anyChecked()? this.allChecked()? "fa fa-check-square-o" : "fa fa-minus-square-o" : "fa fa-square-o" }
            ></i>
          </button>

          <button className="btn btn-default" onClick={this.props.readAll} disabled={this.anyChecked()? "":"disabled"}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.props.unReadAll} disabled={this.anyChecked()? "":"disabled"}>
            Mark As Unread
          </button>

          <select  onChange={this.props.applyLabel} className="form-control label-select" disabled={this.anyChecked()? "":"disabled"} value="Apply Label">
            <option>Apply label</option>
            <option value="dev" >dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select onChange={this.props.removeLabel} className="form-control label-select" disabled={this.anyChecked()? "":"disabled"} value="Remove Label">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={this.anyChecked()? "":"disabled"} onClick={this.props.handleDelete}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>

    );
  }
}

export default Toolbar;
