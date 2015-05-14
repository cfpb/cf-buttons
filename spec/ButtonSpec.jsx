var expect = require('chai').expect;
var React = React = require('react/addons');
var Button = require('../src/Button');
var TestUtils = React.addons.TestUtils;

describe('A button', function() {

  beforeEach(function(){
    var jsdom = require('jsdom');
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.window = document.defaultView;
    global.navigator = window.navigator;
  });

  it('should have a default label', function() {
    var button = TestUtils.renderIntoDocument(
      <Button href="#" />
    );
    var node = button.getDOMNode();
    expect(node.textContent).to.equal('');
  });

  it('should accept a type and pass it to its class', function() {
    var button = TestUtils.renderIntoDocument(
      <Button href="#" label="i heart buttons" type="foo" />
    );
    var node = button.getDOMNode();
    expect(node.className).to.equal('btn btn__foo');
  });

  it('should accept multiple types and pass them to its class', function() {
    var arr = ['foo', 'bar'];
    var button = TestUtils.renderIntoDocument(
      <Button href="#" label="i heart buttons" type={arr} />
    );
    var node = button.getDOMNode();
    expect(node.className).to.equal('btn btn__foo btn__bar');
  });

});
