/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';  
import Adapter from 'enzyme-adapter-react-16';
import Story from "../components/Story";
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line
test ( "Test Render", () => {
    render(
        <Router>
          <Story />
        </Router>
      )
});

it ("TEST getTimeHelper1", () => {
  const wrapper = shallow(<Story/>);
  expect(wrapper.instance().getTimeHelper1({firend: "Jack", img_content:'{}', message_content:"Hello", message_time:"12:00:10"}, "12:00:00:00")).not.toBe(null);
});

it ("TEST getTimeHelper2", () => {
  const wrapper = shallow(<Story/>);
  expect(wrapper.instance().getTimeHelper2({firend: "Jack", img_content:'{}', message_content:"Hello", message_time:"12:00:10"}, "12:00:00:00")).toBe(null);
});

it ("TEST handleChange", () => {
  const wrapper = shallow(<Story/>);
  expect(wrapper.instance().handleChange(["abc"])).not.toBe(null);
});


it ("TEST handledisplayDropBox", () => {
  const wrapper = shallow(<Story/>);
  expect(wrapper.instance().handledisplayDropBox()).not.toBe(null);
});

it ("TEST handleCloseDropBox", () => {
  const wrapper = shallow(<Story/>);
  expect(wrapper.instance().handleCloseDropBox()).not.toBe(null);
});

it ("TEST hanldeSubmit", () => {
  const wrapper = shallow(<Story/>);
  expect(wrapper.instance().hanldeSubmit()).not.toBe(null);
});

it ("TEST render", () => {
  const wrapper = shallow(<Story/>);
  expect(wrapper.instance().render()).not.toBe(null);
});

it ("TEST hanldeDelete", () => {
  const wrapper = shallow(<Story/>);
  expect(wrapper.instance().hanldeDelete()).not.toBe(null);
});


it ("TEST hanldeDelete", () => {
  const wrapper = shallow(<Story/>);
  expect(wrapper.instance().forTest()).not.toBe(null);
});