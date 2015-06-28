var React=require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var NavBar = React.createClass({
  render: function() {
    var rightNav;
    if(session.uid)
      rightNav =  <ul className="nav navbar-nav navbar-right">
                    <li><a>{session.name}</a></li>
                    <li><Link to="/logout">
                    <span className="glyphicon glyphicon-log-out"></span>&nbsp;Logout</Link></li>
                  </ul>;
    else rightNav = <ul className="nav navbar-nav navbar-right">
                      <li>
                        <Link to="/login">
                          <span className="glyphicon glyphicon-log-in"></span>&nbsp;Login</Link>
                    </li></ul>
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#"><img src="assets/Doctr.png" width="24px"/></a>
            <a className="navbar-brand" href="#">Doctr</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {rightNav}
          </div>
        </div>
      </nav>
    );
  }
});

module.exports=NavBar;
