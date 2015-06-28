var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, Navigation } = Router;

var TabBar = require("./tabbar.js");

var qwest=require('qwest');
qwest.base = baseURL;



var Form = React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      tab:"login_patient"
    }
  },
  tabHandler: function(id) {
    this.setState({tab:id});
    this.transitionTo(id);
  },
  render:function(){
    return (
      <div className="smallForm container">
        <h3>Login</h3>
        <TabBar tabs={[
                        {"id":"login_patient","value":"User"},
                        {"id":"login_doctor","value":"Doctor"},
                        {"id":"login_pharmacist","value":"Pharmacist"}
                      ]}
          active={this.state.tab}
          handler={this.tabHandler}/>
          <br />
        <RouteHandler parent={this}/>
      </div>
    )
  }
})

module.exports=Form;
