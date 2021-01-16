/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from "../components/Main";
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { Link } from "react-router";

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line
test("Test Render", () => {
  render(
    <Router>
      <Main />
    </Router>
  )
});

it("TEST getHome", () => {
  const wrapper = shallow(<Main />);
  expect(wrapper.instance().getHome()).not.toBe(null);
});

it("TEST getLogin", () => {
  const wrapper = shallow(<Main />);
  expect(wrapper.instance().getLogin()).not.toBe(null);
});

it("TEST getProfile", () => {
  const wrapper = shallow(<Main />);
  expect(wrapper.instance().getProfile()).not.toBe(null);
});

it("TEST getStory", () => {
  const wrapper = shallow(<Main />);
  expect(wrapper.instance().getStory()).not.toBe(null);
});