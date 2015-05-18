if (typeof module !== 'undefined' && module.exports) {
  var React = require('react');
  require('react/addons');
}

var allowedTypes = [
  'super',
  'disabled',
  'warning',
];

function genClassName(classes, configPrefix, props) {
  var config = (props.config instanceof Array) ? props.config : [props.config];
  var configClasses = config.map(function(c) {
    return ' ' + configPrefix + '__' + c;
  }).join('')
  var className = classes + configClasses
  if (props.className) {
    className += ' ' + props.className;
  }
  return className
}

var CFButton = React.createClass({
  propTypes: {
    config: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    rightIcon: React.PropTypes.element,
    leftIcon: React.PropTypes.element,
  },
  getDefaultProps: function() {
    return {
      config: []
    };
  },
  render: function() {
    var rightIcon, leftIcon

    var btnClassName = genClassName('btn', 'btn', this.props)

    if (this.props.rightIcon) {
      rightIcon = React.addons.cloneWithProps(this.props.rightIcon, {className: 'btn_icon__right'});
    }
    if (this.props.leftIcon) {
      leftIcon = React.addons.cloneWithProps(this.props.leftIcon, {className: 'btn_icon__left'});
    }

    var buttonProps = omit(this.props, 'config', 'rightIcon', 'leftIcon', 'className', 'children');

    if (this.props.href) {
      return <a className={btnClassName} {...buttonProps}>{leftIcon}{this.props.children}{rightIcon}</a>
    } else {
      return <button className={btnClassName} {...buttonProps}>{leftIcon}{this.props.children}{rightIcon}</button>
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CFButton;
}
