import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


class Composer extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
        {this.props.isComposing? "" : <Redirect to="/messages" /> }
        <form className="form-horizontal well" onSubmit={this.props.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject">
              </input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea name="body" id="body" className="form-control"></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">

                <button to="messages" type="submit" value="Send" className="btn btn-primary">
                    Send Message
                </button>

            </div>
          </div>
        </form>
      </div>
      </React.Fragment>
    );
  }
}

export default Composer;
