var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var qwest=require('qwest');
qwest.base = baseURL;

var PastRecords = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {loaded:false,content:null};
  },
  componentDidMount: function() {
    qwest.get('user/'+this.context.router.getCurrentParams().pid+'/record/'+this.context.router.getCurrentParams().rid,{token:session.token})
          .then(function(response) {
            console.log(response[0]);
            this.setState({loaded:true,content:response[0]});
          }.bind(this));
  },
  render:function() {
    return (
      <div className="container smallForm">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
              Billing
            </div>
          </div>
          {this.state.loaded?
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Medicines</strong>
                </td>
                <td>
                  <ol>
                    {this.state.content.medicine.split(" ").map(function(text) {return <li>{text}</li>})}
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>:
          "Loading..."}
          <div className="panel-body">
            <Link className="btn btn-primary" to="pharmacist">Done</Link>
          </div>
        </div>
      </div>
    )
  }
});

module.exports=PastRecords;
