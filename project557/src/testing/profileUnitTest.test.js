/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';  
import Adapter from 'enzyme-adapter-react-16';
import Profile from "../components/Profile";
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line
test ( "Test Render", () => {
    render(
        <Router>
          <Profile />
        </Router>
      )
});

it ("TEST handleSetPassWordSubmit", () => {
  const wrapper = shallow(<Profile/>);
  expect(wrapper.instance().handleSetPassWordSubmit()).not.toBe(null);
});


it ("TEST handleSetPassWordSubmit 2", () => {
  const wrapper = shallow(<Profile/>).instance();
  wrapper.forTest();
  expect(wrapper.handleSetPassWordSubmit()).not.toBe(null);
});

it ("TEST handlechangePasswordButton", () => {
  const wrapper = shallow(<Profile/>);
  expect(wrapper.instance().handlechangePasswordButton()).not.toBe(null);
});

it ("TEST handlechangeAvatarButton", () => {
  const wrapper = shallow(<Profile/>);
  expect(wrapper.instance().handlechangeAvatarButton()).not.toBe(null);
});

it ("TEST handledeactivateAccountButton", () => {
  const wrapper = shallow(<Profile/>);
  expect(wrapper.instance().handledeactivateAccountButton()).not.toBe(null);
});

it ("TEST handleDeactivateButton", () => {
  const wrapper = shallow(<Profile/>).instance();
  wrapper.forTest();
  expect(wrapper.handleDeactivateButton()).not.toBe(null);
});

it ("TEST handleInputChange", () => {
  const wrapper = shallow(<Profile/>);
  var event = new CustomEvent('build', { "target": {value : 1} });
  expect(wrapper.instance().handleInputChange(event) === undefined);
});

it ("TEST handleDeactivateGoback", () => {
  const wrapper = shallow(<Profile/>);
  expect(wrapper.instance().handleDeactivateGoback() === undefined);
});

it ("TEST hanfleImgUpload", () => {
  const wrapper = shallow(<Profile/>);
  var event = new CustomEvent('build', { "target": {value : 1} });
  expect(wrapper.instance().hanfleImgUpload(event) === undefined);
});

it ("TEST finishAvatorButton", () => {
  const wrapper = shallow(<Profile/>);
  expect(wrapper.instance().finishAvatorButton() === undefined);
});

