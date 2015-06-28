var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, Navigation } = Router;

var qwest=require('qwest');
qwest.base = baseURL;

var Vitals=React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {loaded:false,content:null};
  },
  componentDidMount: function() {
    qwest.get('doctor/'+this.context.router.getCurrentParams().pid+'/vital',{token:session.token})
          .then(function(response) {
            this.setState({loaded:true,content:response[0]});
          }.bind(this));
  },
  render: function() {
    var list=[];
    if(this.state.content!=null) {
      for (var index in this.state.content) {
          if (!this.state.content.hasOwnProperty(index)) {
              continue;
          }
          if(index=="vitalid"||index=="uid") continue;
          list.push(<tr key={index}>
                      <td>{index}</td>
                      <td>{this.state.content[index]}</td>
                    </tr>)
      }
    }
    var content=(this.state.loaded)?
                <table className="table">
                  <tbody>
                    {list}
                  </tbody>
                </table>
                :"Loading...";
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row panel-title">
              <div className="col-xs-11">
                Vitals
              </div>
              <div className="col-xs-1 text-right">
                <Link to="doctor_vitals_edit" params={{pid:this.context.router.getCurrentParams().pid}}>
                  <span className="glyphicon glyphicon-edit"></span>
                </Link>
              </div>
            </div>
          </div>
          {content}
        </div>
      </div>
    );
  }
});

//React.render(<Vitals />,document.body);
module.exports=Vitals;
