var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, Navigation } = Router;


var qwest=require('qwest');
qwest.base = baseURL;



var Form = React.createClass({
  mixins: [Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  componentWillMount: function() {
    this.props.parent.setState({"tab":"doctor_checkout_record"})
  },
  getInitialState: function(){
    return {
      failure:false
    }
  },
  submit: function() {
    qwest.post('doctor/'+this.context.router.getCurrentParams().pid+'/record',{
      diagnosis:document.getElementById('diagnosis').value,
      medicine:document.getElementById('medicine').value,
      token:session.token
    }).then(function(response) {
      this.transitionTo("doctor");
    }.bind(this));
  },
  render:function(){
    return (
      <div>
        <div className="form-group">
          <label>Diagnosis</label>
          <textarea id="diagnosis" placeholder="Diagnosis" className="form-control"/>
        </div>
        <div className="form-group">
          <label>Medicines</label>
          <textarea id="medicine" placeholder="Medicines" className="form-control"/>
        </div>
        <button className="btn btn-primary" onClick={this.submit}>Checkout</button>
      </div>
    )
  }
});

module.exports=Form;
