var jsx = require('jsx-test');
var React = require('react/addons');
var Button = require('../coverage/dist/Button');

describe('A button', function() {
  // it('should return true if greater than ten', function() {
  //   var actual = gtten(20);
  //   expect(actual).toBe(true);
  // })

  it('should have a default label', function() {
    var button = jsx.renderComponent(
      Button, {href: '#'}
    );
    var node = button.getDOMNode();
    expect(node.textContent).toEqual('');
  });

  it('should accept a type and pass it to its class', function() {
    var button = jsx.renderComponent(
      Button, {href: '#', label: 'i heart buttons', type: 'foo'}
    );
    var node = button.getDOMNode();
    expect(node.className).toEqual('btn btn__foo');
  });

  it('should accept multiple types and pass them to its class', function() {
    var arr = ['foo', 'bar'];
    var button = jsx.renderComponent(
      Button, {href: '#', label: 'i heart buttons', type: arr}
    );
    var node = button.getDOMNode();
    expect(node.className).toEqual('btn btn__foo btn__bar');
  });

});
