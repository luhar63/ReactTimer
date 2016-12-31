var React = require("react");
import Clock from 'Clock';
import CountdownForm  from 'CountdownForm';
import Controls from 'Controls';



var Countdown = React.createClass({
  getInitialState:function (){
    return {
      count : 0,
      countdownStatus : 'stopped'
    };
  },
  componentDidUpdate : function (prevProps,prevState){
    if(this.state.countdownStatus !== prevState.countdownStatus){
      switch(this.state.countdownStatus){
        case 'started' :
          this.startTimer();
          break;
        case 'stopped':
        this.setState({count:0});
        case 'paused' :
          clearInterval(this.timer)
          this.timer = undefined;
          break;
      }
    }
  },
  // componentWillUpdate: function (nextProps,nextState){
  //   console.log();
  // },
  // componentWillReceiveProps:function (){
  //
  // },
  // componentWillMount: function () {
  //   console.log("Component will mount");
  // },
  // componentDidMount: function () {
  //   console.log("Component did mount");
  // },
  componentWillUnmount: function(){
    console.log("component did unmount");
    clearInterval(this.timer);
    this.timer = undefined;
  },
  startTimer : function (){
    this.timer = setInterval(() => {
        var newCount = this.state.count - 1;
        this.setState({
          count : newCount>=0?newCount : 0
        });
        if(newCount === 0){
          this.setState({countdownStatus:'stopped'});
        }
    },1000);

  },
  handleSetCountdown :function(seconds){
    this.setState({
      count:seconds,
      countdownStatus : 'started'
    });
  },
  handleStatusChange : function(newStatus){
    this.setState({
      countdownStatus : newStatus
    });
  },
  render: function() {
    var {count,countdownStatus} = this.state;
    var renderControlArea = ()=>{
      if(countdownStatus !=='stopped'){
        return (<Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>)
      }else{
        return (<CountdownForm onSetCountdown={this.handleSetCountdown}/>)
      }
    };
    return (
      <div>
        <h1 className="page-title">Countdown App</h1>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    );
  }
});

module.exports = Countdown;
