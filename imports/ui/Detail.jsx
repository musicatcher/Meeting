import React, { Component, PropTypes } from 'react';
 
import { Details } from '../api/details.js';

import { Session } from 'meteor/session'

export default class Detail extends Component {
  toggleChecked() {
    Details.update(this.props.detail._id, {
      $set: { checked: !this.props.detail.checked },
    });
  }

  render() {
    const detailClassName = this.props.detail.checked ? 'checked' : '';

    if (this.props.detail.name == Session.get("currentName")) { //only modify own schedule
      return (
        <li className={detailClassName}>
          <input
              type="checkbox"
              readOnly
              checked={this.props.detail.checked}
              onClick={this.toggleChecked.bind(this)}
            />
          <span className="text">day:{this.props.detail.day} hour:{this.props.detail.hour}:00</span>
        </li>
      );
    } else {
      return (
        <li className={detailClassName}>
          <input
              type="checkbox"
              readOnly
              checked={this.props.detail.checked}
              onClick={this.toggleChecked.bind(this)}
              disabled="true"
            />
          <span className="text">day:{this.props.detail.day} hour:{this.props.detail.hour}:00</span>
        </li>
      );
    }
    
  }
}
 
Details.propTypes = {
  detail: PropTypes.object.isRequired,
};
// <template name="Detail-template">
        
      // </template>

      // if (this.props.detail.name == Session.get("currentName")) {