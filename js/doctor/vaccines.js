var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var qwest=require('qwest');
qwest.base = baseURL;

var Vaccines = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {loaded:false,content:null};
  },
  componentDidMount: function() {
    qwest.get('doctor/'+this.context.router.getCurrentParams().pid+'/vaccine',{token:session.token})
          .then(function(response) {
            this.setState({loaded:true,content:response});
          }.bind(this));
  },
  render:function() {
    var list=[];
    if(this.state.content!=null) {
      for(var i=0;i<this.state.content.length;i++) {
        list.push(
          <tr key={this.state.content[i].vid}>
            <td>{this.state.content[i].vaccine}</td>
            <td>{this.state.content[i].date}</td>
            <td>{this.state.content[i].place}</td>
          </tr>)
      }
    };
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">Vaccines</div>
        </div>
        <table className="table">
          <thead>
            <th>Vaccine</th>
            <th>Date</th>
            <th>Place</th>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      </div>
    )
  }
});

//React.render(<Vaccines />,document.body);

module.exports=Vaccines;
