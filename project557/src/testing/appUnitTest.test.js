/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from "../components/App";
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line
test("Test Render", () => {
  render(
    <Router>
      <App />
    </Router>
  )
});

it("TEST handleLogink", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.instance().handleLogink("THIS_IS_A_SECRET", "jack", "abc123")).not.toBe(null);
});

it("TEST handleDate", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.instance().handleDate("Data is not empty")).not.toBe(null);
});