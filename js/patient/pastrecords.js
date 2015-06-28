var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var qwest=require('qwest');
qwest.base = baseURL;

var PastRecords = React.createClass({
  getInitialState: function() {
    return {loaded:false,content:null};
  },
  componentDidMount: function() {
    qwest.get('user/'+session.uid+'/record',{token:session.token})
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
            <td>{this.state.content[i].diagnosis}</td>
            <td>{this.state.content[i].date}</td>
            <td>{this.state.content[i].medicine}</td>
          </tr>)
      }
    };
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            Past Records
          </div>
        </div>
        <table className="table">
          <thead>
            <th>
              Diagnosis
            </th>
            <th>
              Date
            </th>
            <th>
              Medicines
            </th>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      </div>
    )
  }
});

//React.render(<PastRecords />,document.body);
module.exports=PastRecords;
