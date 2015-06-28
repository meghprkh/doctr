var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, Navigation } = Router;

var qwest=require('qwest');
qwest.base = baseURL;

var VitalsEdit = React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {loaded:false,content:null};
  },
  componentDidMount: function() {
    qwest.get('doctor/'+this.context.router.getCurrentParams().pid+'/vital')
          .then(function(response) {
            if(response.length==0) {
              response[0]={
                "height":null,
                "weight":null,
                "bmi":null,
                "pulse":null,
                "bp":null
              }
            }
            this.setState({loaded:true,content:response[0]});
          }.bind(this));
  },
  submit: function() {
    qwest.post('doctor/'+this.context.router.getCurrentParams().pid+'/vital/edit',{
      height:document.getElementById('height').value,
      weight:document.getElementById('weight').value,
      bmi:document.getElementById('bmi').value,
      pulse:document.getElementById('pulse').value,
      bp:document.getElementById('bp').value
    }).then(function(response) {
      this.transitionTo("doctor_vitals",{pid:this.context.router.getCurrentParams().pid});
    }.bind(this));
  },
  render: function() {
    var list=[];
    if(this.state.content!=null) {
      for (var index in this.state.content) {
          if (!this.state.content.hasOwnProperty(index)) {
              continue;
          }
          if(index=="uid") continue;
          list.push(<tr key={index}>
                      <td>{index}</td>
                      <td><input defaultValue={this.state.content[index]} id={index}/></td>
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
      <div className="container"><br />
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
                Vitals
            </div>
          </div>
          <form onSubmit={this.submit}>
            {content}
            <div className="panel-body" role="toolbar">
              <div className="btn-toolbar">
                <button type="submit"
                    className="btn btn-primary"
                    >Save
                    </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports=VitalsEdit;
