/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationBar from "../components/NavigationBar";
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line
test("Test Render", () => {
  render(
    <Router>
      <NavigationBar />
    </Router>
  )
});

it("TEST handleLogout", () => {
  const wrapper = shallow(<NavigationBar />);
  expect(wrapper.instance().handleLogout()).not.toBe(null);
});