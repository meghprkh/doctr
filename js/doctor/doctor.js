var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, Navigation } = Router;

var App = React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function() {
    if(!session.uid) this.transitionTo("login_doctor");
    if(!session.doctor) this.transitionTo("login_doctor");
  },
  render: function () {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports=App
