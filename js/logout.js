var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, Navigation } = Router;



var Logout = React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    session={};
    this.transitionTo("login");
    return (<div>Logging you out .... </div>);
  }
});

module.exports=Logout;
