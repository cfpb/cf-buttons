var jsx = require('jsx-test');
var React = require('react/addons');
var CFButton = require('../coverage/dist/CFButton');

describe('A button', function() {
  // it('should return true if greater than ten', function() {
  //   var actual = gtten(20);
  //   expect(actual).toBe(true);
  // })

  it('should create all children inside the button element', function() {
    var button = jsx.renderComponent(
      CFButton, {href: '#', children: ['hello world']}
    );
    var node = button.getDOMNode();
    expect(node.textContent).toEqual('hello world');
  });

  it('should accept a type and pass it to its class', function() {
    var button = jsx.renderComponent(
      CFButton, {href: '#', type: 'foo'}
    );
    var node = button.getDOMNode();
    expect(node.className).toEqual('btn btn__foo');
  });

  it('should accept multiple types and pass them to its class', function() {
    var arr = ['foo', 'bar'];
    var button = jsx.renderComponent(
      CFButton, {href: '#', type: arr}
    );
    var node = button.getDOMNode();
    expect(node.className).toEqual('btn btn__foo btn__bar');
  });

  it('should accept className and append to the className generated from type', function() {
    var button = jsx.renderComponent(
      CFButton, {href: '#', type: 'foo', className: 'hello world'}
    );
    var node = button.getDOMNode();
    expect(node.className).toEqual('btn btn__foo hello world');
  })

  it('should create a button when no href is supplied', function() {
    var button = jsx.renderComponent(
      CFButton, {type: 'foo', className: 'hello world'}
    );
    var node = button.getDOMNode();

    expect(node.tagName).toEqual('BUTTON');
  })

  it('should create an anchor when href is supplied', function() {
    var button = jsx.renderComponent(
      CFButton, {type: 'foo', href: '#', className: 'hello world'}
    );
    var node = button.getDOMNode();

    expect(node.tagName).toEqual('A');
  })

  it ('should add a "btn_icon__right" to the props.rightIcon and display to the right', function() {
    var StubIcon = jsx.stubComponent('i', null, true)
    var rightIcon = React.createElement(StubIcon, {className: 'icon-class'})
    var button = jsx.renderComponent(
      CFButton, {type: 'foo', children: [React.createElement('span', {})], rightIcon: rightIcon}
    );
    var node = button.getDOMNode();
    expect(node.childNodes.length).toEqual(2);
    expect(node.childNodes[1].tagName).toBe('I');
    expect(node.childNodes[1].className).toBe('btn_icon__right icon-class');
  })

  it ('should add a "btn_icon__left" to the props.leftIcon and display to the left', function() {
    var StubIcon = jsx.stubComponent('i', null, true)
    var leftIcon = React.createElement(StubIcon, {className: 'icon-class'})
    var button = jsx.renderComponent(
      CFButton, {type: 'foo', children: [React.createElement('span', {})], leftIcon: leftIcon}
    );
    var node = button.getDOMNode();
    console.log(node.innerHTML);
    expect(node.childNodes.length).toEqual(2);
    expect(node.childNodes[0].tagName).toBe('I');
    expect(node.childNodes[0].className).toBe('btn_icon__left icon-class');
  })
});
