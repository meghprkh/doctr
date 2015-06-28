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
  componentWillMount: function() {
    this.props.parent.setState({"tab":"login_doctor"})
  },
  getInitialState: function(){
    return {
      failure:false
    }
  },
  verify: function() {
    qwest.post('login/doctor/',{
            "email":document.getElementById("login-email").value,
            "password":document.getElementById("login-password").value})
          .then(function(response) {
            if(response.success) {
              session.uid=response.uid;
              session.token=response.token;
              session.name=response.name;
              session.doctor=true;
              session.did=response.did;
              this.transitionTo("doctor");
            } else {
              this.setState({failure:true})
            }
          }.bind(this));
  },
  render:function(){
    return (
      <div>
        {this.state.failure?
          (<div className="alert alert-danger" role="alert">Invalid Credentials</div>)
          :""}
        <div className="form-group">
          <label>Email</label>
          <input id="login-email" placeholder="Email"
              className="form-control"/>
        </div>

        <div>
          <div className="form-group">
            <label>Password</label>
            <input id="login-password" type="password" placeholder="Password" className="form-control"/>
          </div>
          <button className="btn btn-primary" onClick={this.verify}>Login</button>
        </div>
      </div>
    )
  }
});

module.exports=Form;
