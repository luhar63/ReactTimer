var React = require("react");
import Clock from 'Clock';

var Countdown = React.createClass({
  render: function() {
    return (
      <div>
        <Clock totalSeconds= {129}/>
      </div>
    );
  }
});

module.exports = Countdown;
