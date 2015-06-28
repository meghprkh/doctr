var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, Navigation } = Router;

var TabBar = require("../tabbar.js");

var qwest=require('qwest');
qwest.base = baseURL;



var Form = React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      tab:"doctor_checkout_record"
    }
  },
  tabHandler: function(id) {
    this.setState({tab:id});
    this.transitionTo(id,{pid:this.context.router.getCurrentParams().pid});
  },
  render:function(){
    return (
      <div className="smallForm container">
        <TabBar tabs={[{"id":"doctor_checkout_record","value":"Prescibe"},{"id":"doctor_checkout_vaccine","value":"Vaccinate"}]}
          active={this.state.tab}
          handler={this.tabHandler}/>
          <br />
        <RouteHandler parent={this}/>
      </div>
    )
  }
})

module.exports=Form;
