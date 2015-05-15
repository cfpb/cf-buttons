var React = require('react');

var allowedTypes = [
  'super',
  'disabled',
  'warning',
];

var Button = React.createClass({
  propTypes: {
    type: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    rightIcon: React.PropTypes.string,
    leftIcon: React.PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      type: []
    };
  },
  render: function() {
    var rightIcon, leftIcon

    var buttonTypes = (this.props.type instanceof Array) ? this.props.type : [this.props.type];
    var buttonClasses = 'btn' + buttonTypes.map(function(t) {
        return ' btn__' + t
      }).join('');

    if (this.props.rightIcon) {
      var classes = "btn_icon__right cf-icon cf-icon-" + this.props.rightIcon;
      rightIcon = <span className={classes}></span>
    }
    if (this.props.leftIcon) {
      var classes = "btn_icon__right cf-icon cf-icon-" + this.props.leftIcon;
      rightIcon = <span className={classes}></span>
    }

    var buttonProps = omit(this.props, 'type', 'rightIcon', 'leftIcon');

    if (this.props.href) {
      return <a className={buttonClasses} {...buttonProps}>{leftIcon}{this.props.children}{rightIcon}</a>
    } else {
      return <button className={buttonClasses} {...buttonProps}>{leftIcon}{this.props.children}{rightIcon}</button>
    }
  }
});

function omit(obj) {
  var omitted = Array.prototype.slice.call(arguments, 1);
  var out = {};
  var props = Object.getOwnPropertyNames(obj);
  for (var i=0;i<props.length;i++) {
    var prop = props[i];
    if (omitted.indexOf(prop) < 0) {
      out[prop] = obj[prop];
    }
  }
  return out
}

module.exports = Button;
