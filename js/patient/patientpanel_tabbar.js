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
    if(!session.uid) this.transitionTo("login");
    qwest.get('getuser/'+session.uid,{token:session.token})
          .then(function(response) {
            this.setState({loaded:true,content:response[0]});
          }.bind(this));
  },
  getInitialState: function() {
    return {tab:"patient_past_records",loaded:false,content:null}
  },
  tabHandler: function(id) {
    this.setState({tab:id});
    this.transitionTo(id);
  },
  render:function() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h5>User Details</h5>
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
                <i>UID</i> {session.uid}
              </div>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <a href="nearby_hospitals.html" target="_blank" className="btn btn-primary">Nearby Hospitals</a>
              </div>
              <div className="col-xs-12 col-md-6 text-right">
                <Link className="btn btn-primary"
                      to="predict">Predict Disease From Symptoms
                </Link>
              </div>
            </div>
          </div>
        </div>

        <TabBar
          tabs={[{"id":"patient_past_records","value":"Past Records"},
                  {"id":"patient_vaccines","value":"Vaccines"},
                  {"id":"patient_allergies","value":"Allergies"},
                  {"id":"patient_vitals","value":"Vitals"}]}
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
