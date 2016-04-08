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
    return (
      <li className={detailClassName}>
        <span className="text">day:{this.props.detail.day} hour:{this.props.detail.hour}:00</span>
      </li>
    );
  }
}
 
Details.propTypes = {
  detail: PropTypes.object.isRequired,
};
// <template name="Detail-template">
        
      // </template>

      // if (this.props.detail.name == Session.get("currentName")) {