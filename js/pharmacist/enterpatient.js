var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, Navigation } = Router;

var qwest=require('qwest');
qwest.base = baseURL;

var EnterPatient = React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  submitHandler:function() {
    qwest.get('getpid',{
      email:document.getElementById('patientEmail').value,
      token:session.token})
      .then(function(response){
        console.log(response.pid);
        this.transitionTo("pharmacist_patient",
                      {pid:response.pid});
      }.bind(this));
  },
  render: function() {
    return (
      <div className="container">
        <form className="smallForm" onSubmit={this.submitHandler}>
          <div className="form-group">
            <label>Enter Patient's Email</label>
            <input placeholder="Patient Email" className="form-control"
                id="patientEmail"/>
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>
    );
  }
});

module.exports=EnterPatient
