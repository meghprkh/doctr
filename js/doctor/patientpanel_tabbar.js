var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, Navigation } = Router;

var qwest=require('qwest');
qwest.base = baseURL;

var TabBar= require('../tabbar.js');

var PatientPanel_tabbar = React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function() {
    qwest.get('getuser/'+this.context.router.getCurrentParams().pid,{token:session.token})
          .then(function(response) {
            this.setState({loaded:true,content:response[0]});
          }.bind(this));
  },
  getInitialState: function() {
    return {tab:"doctor_past_records",loaded:false,content:null}
  },
  tabHandler: function(id) {
    this.setState({tab:id});
    this.transitionTo(id,{pid:this.context.router.getCurrentParams().pid});
  },
  render:function() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <h5>Patient Details</h5>
              </div>
              <div className="col-xs-12 col-md-6 text-right">
                <Link className="btn btn-danger" to="checkout" params={{pid:this.context.router.getCurrentParams().pid}}>Checkout Patient</Link>
              </div>
            </div>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-xs-12 col-md-3">
                {(this.state.content)?this.state.content['name']:""}
              </div>
              <div className="col-xs-12 col-md-3 text-center">
                <i>Sex:</i> {(this.state.content)?(this.state.content['gender']=='M')?"Male":"Female":""}
              </div>
              <div className="col-xs-12 col-md-3 text-center">
                <i>DOB:</i> {(this.state.content)?this.state.content['dob']:""}
              </div>
              <div className="col-xs-12 col-md-3 text-right">
                <i>PID</i> {this.context.router.getCurrentParams().pid}
              </div>
            </div>
          </div>
        </div>

        <TabBar
          tabs={[{"id":"doctor_past_records","value":"Past Records"},
                  {"id":"doctor_vaccines","value":"Vaccines"},
                  {"id":"doctor_allergies","value":"Allergies"},
                  {"id":"doctor_vitals","value":"Vitals"}]}
          active={this.state.tab}
          handler={this.tabHandler}
        />
        <br />
        <RouteHandler />
      </div>
    )
  }
});

module.exports=PatientPanel_tabbar;
