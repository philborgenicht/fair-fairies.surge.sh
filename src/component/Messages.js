import React, { Component } from 'react';
import Message from './Message';

class Messages extends Component {
  render() {
    return (
      <React.Fragment>
      <div>
        {this.props.messages? this.props.messages.map(message=><Message message={message} read={this.props.read} select={this.props.select} key={message.id} starred={this.props.starred}/>):""}
      </div>
      </React.Fragment>
    );
  }
}

export default Messages;
