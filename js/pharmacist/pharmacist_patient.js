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
    qwest.get('user/'+this.context.router.getCurrentParams().pid+'/record',{token:session.token})
          .then(function(response) {
            this.setState({loaded:true,content:response});
          }.bind(this));
  },
  render:function() {
    var list=[];
    if(this.state.content!=null) {
      for(var i=0;i<this.state.content.length;i++) {
        list.push(
          <tr key={i}>
            <td>{this.state.content[i].date}</td>
            <td>{this.state.content[i].medicine}</td>
            <td className="text-right">
              <Link className="btn btn-primary" to="pharmacist_patient_checkout"
                    params={{pid:this.context.router.getCurrentParams().pid,
                              rid:this.state.content[i].rid}}>
                              Bill It
              </Link>
            </td>
          </tr>)
      }
    };
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
              Past Records
            </div>
          </div>
          {this.state.loaded?
          <table className="table">
            <thead>
              <th>
                Date
              </th>
              <th>
                Medicines
              </th>
              <th/>
            </thead>
            <tbody>
              {list}
            </tbody>
          </table>:
          "Loading..."}
        </div>
      </div>
    )
  }
});

//React.render(<PastRecords />,document.body);
module.exports=PastRecords;
