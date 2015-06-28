var React = require("react");

var TabBar = React.createClass({
  render: function() {
    var list = this.props.tabs.map(function(obj,key){
      var classN;
      if(this.props.active==obj.id) classN="active";
      else classN="";
      return (
        <li role="presentation"
            className={classN}
            key={key}
            >
          <a onClick={this.props.handler.bind(null,obj.id)}>{obj.value}</a>
        </li>
      )
    },this);
    return (
      <ul className="nav nav-tabs nav-justified">
        {list}
      </ul>
    )
  }
});

module.exports=TabBar;
