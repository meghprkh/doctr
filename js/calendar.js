var React = require("react");

var Calendar = require('react-datepicker');

var DatePicker = React.createClass({
  getInitialState:function() {
    return {selected:null}
  },
  handleChange:function(date) {
    this.setState({selected:date});
  },
  render:function() {
    return (<Calendar
        dateFormatCalendar="YYYY-MM-DD"
        placeholderText="YYYY-MM-DD"
        selected={this.state.selected}
        onChange={this.handleChange}
    />);
  }
});

module.exports=DatePicker;
