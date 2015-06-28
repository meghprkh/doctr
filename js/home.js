var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, Navigation } = Router;


var Home=React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function() {
    if(session.uid) {
      if(session.doctor) this.transitionTo("doctor");
      else this.transitionTo("patient");
    }
  },
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="jumbotron">
              <h1>Users</h1>
              <div className="btn-toolbar" role="group" aria-label="...">
                <Link to="/login/patient" className="btn btn-primary btn-lg">Login</Link>
                <Link to="/register/patient" className="btn btn-primary btn-lg">Register</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="jumbotron">
              <h1>Doctors</h1>
              <div className="btn-toolbar" role="group" aria-label="...">
                <Link to="/login/doctor" className="btn btn-primary btn-lg">Login</Link>
                <Link to="/register/doctor" className="btn btn-primary btn-lg">Register</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="jumbotron">
              <h1>Pharmacists</h1>
              <div className="btn-toolbar" role="group" aria-label="...">
                <Link to="/login/pharmacist" className="btn btn-primary btn-lg">Login</Link>
                <Link to="/register/pharmacist" className="btn btn-primary btn-lg">Register</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="jumbotron">
          <h5>Credentials</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>User</td>
                <td>meet@gmail.com</td>
                <td>password</td>
              </tr>
              <tr>
                <td>Doctor</td>
                <td>megh@gmail.com</td>
                <td>password</td>
              </tr>
              <tr>
                <td>Pharmacist</td>
                <td>sid@gmail.com</td>
                <td>password</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>);
  }
});

module.exports=Home;
