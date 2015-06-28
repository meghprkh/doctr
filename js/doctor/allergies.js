var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, Navigation } = Router;

var qwest=require('qwest');
qwest.base = baseURL;

var Allergies = React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {loaded:false,content:null};
  },
  getInitialState: function() {
    return {loaded:false,content:null};
  },
  componentDidMount: function() {
    qwest.get('doctor/'+this.context.router.getCurrentParams().pid+'/allergy',{token:session.token})
          .then(function(response) {
            this.setState({loaded:true,content:response});
          }.bind(this));
  },
  render:function() {
    var list=[];
    if(this.state.content!=null) {
      for(var i=0;i<this.state.content.length;i++) {
        list.push(
          <tr key={this.state.content[i].aid}>
            <td>{this.state.content[i].allergen}</td>
            <td>{this.state.content[i].reaction}</td>
            <td>{this.state.content[i].severity}</td>
            <td>{this.state.content[i].comment}</td>
            <td>{this.state.content[i].actions}</td>
            <td>{this.state.content[i].lastupdated}</td>
          </tr>)
      }
    };
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            Allergies
          </div>
        </div>
        <table className="table">
          <thead>
            <th>
              Allergen
            </th>
            <th>
              Reaction
            </th>
            <th>
              Severity
            </th>
            <th>
              Comment
            </th>
            <th>
              Actions
            </th>
            <th>
              Last Updated
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

module.exports=Allergies;
