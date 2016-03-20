import moment from 'moment'
import React from 'react'

moment.locale(
  'en-short',
  {
    relativeTime: {
      d: "1d",
      dd: "%dd",
      future: "%s",
      h: "1h",
      hh: "%dh",
      m: "1m",
      M: "1M",
      mm: "%dm",
      MM: "%dM",
      past: "%s",
      s: "now",
      y: "1y",
      yy: "%dy",
    },
  },
);

export default class Time extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.now != nextProps.now;
  }

  getRelativeTime() {
    return this.getMomentTime().locale('en-short').fromNow();
  }

  getAbsoluteTime() {
    return this.getMomentTime().format('YYYY-MM-DD HH:mm');
  }

  getDisplayedTime() {
    if (this.getMomentTime().isBefore(moment.duration(24, 'hours'))) {
      return this.getAbsoluteTime();
    } else {
      return this.getRelativeTime();
    }
  }

  getDateTime() {
    return this.getMomentTime().format('YYYY-MM-DDTHH:mm:ssZ');
  }

  getMomentTime() {
    return moment(new Date(this.props.time));
  }

  render() {
    return(
      <time {...this.props} dateTime={this.getDateTime()} title={this.getAbsoluteTime()}>
        {this.getDisplayedTime()}
      </time>
    );
  }
}
