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
    this.props.parent.setState({"tab":"doctor_checkout_vaccine"})
  },
  getInitialState: function(){
    return {
      failure:false
    }
  },
  submit: function() {
    qwest.post('doctor/'+this.context.router.getCurrentParams().pid+'/vaccine',{
      vaccine:document.getElementById('vaccine').value,
      place:document.getElementById('place').value,
      token:session.token
    }).then(function(response) {
      this.transitionTo("doctor");
    }.bind(this));
  },
  render:function(){
    return (
      <div>
        <div className="form-group">
          <label>Vaccine</label>
          <input id="vaccine" placeholder="Vaccine" className="form-control"/>
        </div>
        <div className="form-group">
          <label>Place</label>
          <input id="place" placeholder="Place" className="form-control"/>
        </div>
        <button className="btn btn-primary" onClick={this.submit}>Checkout</button>
      </div>
    )
  }
});

module.exports=Form;
