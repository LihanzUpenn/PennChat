/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from "../components/Home";
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line
test("Test Render", () => {
  render(
    <Router>
      <Home />
    </Router>
  )
});

it("TEST handleInputonChange", () => {
  const wrapper = shallow(<Home />);
  var event = new CustomEvent('build', { "target": { value: 1 } });
  expect(wrapper.instance().handleInputonChange(event) === undefined);
});

it("TEST handleInputonChangeStranger", () => {
  const wrapper = shallow(<Home />);
  var event = new CustomEvent('build', { "target": { value: 1 } });
  expect(wrapper.instance().handleInputonChangeStranger(event) === undefined);
});


// it ("TEST MessageSomeone", () => {
//   const wrapper = shallow(<Home/>);
//   expect(wrapper.instance().MessageSomeone("jeffrey") === undefined);
// });

it("TEST deleteFriend", () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.instance().deleteFriend("jeffrey") === undefined);
});

it("TEST AddStangers", () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.instance().AddStangers("jeffrey") === undefined);
});

it("TEST displayVideo", () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.instance().displayVideo() === undefined);
});

it("TEST endDisplayVideo", () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.instance().endDisplayVideo() === undefined);
});

// it ("TEST handleDate", () => {
//   const wrapper = shallow(<Home/>);
//   expect(wrapper.instance().handleDate("Data is not empty")).not.toBe(null);
// });