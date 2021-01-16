/* eslint-disable*/

// import Enzyme, { shallow } from 'enzyme';  
// import Adapter from 'enzyme-adapter-react-16';
// import { BrowserRouter as Router } from 'react-router-dom';

// import 'jest-dom/extend-expect';
// import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render } from '@testing-library/react';
import Chat from "../components/Chat";
import MessagesComponent from "../components/Chat";

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { BrowserRouter as Router } from 'react-router-dom';

test("Test Render Chat", () => {
  render(
    <Router>
      <Chat
        from={"Jack"}
        to={"Liam"}
        currentMessage={[{ "from_host": "Jack" }]}
        time={"12:24:00"}
        // eslint-disable-next-line react/no-access-state-in-setstate
        previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
        displayVideo={"none"}
      />
    </Router>
  )
});

// eslint-disable-next-line
test("Test Render Text", () => {
  const { getByTestId } = render(
    <Chat
      from={"Jack"}
      to={"Liam"}
      currentMessage={[{ "from_host": "Jack" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render video", () => {
  const { getByTestId } = render(
    <Chat
      from={"Jack"}
      to={"Liam"}
      currentMessage={[{ "from_host": "Jack" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "video", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render image", () => {
  const { getByTestId } = render(
    <Chat
      from={"Jack"}
      to={"Liam"}
      currentMessage={[{ "from_host": "Jack" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "image", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render audio", () => {
  const { getByTestId } = render(
    <Chat
      from={"Jack"}
      to={"Liam"}
      currentMessage={[{ "from_host": "Jack" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "audio", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render text from different", () => {
  const { getByTestId } = render(
    <Chat
      from={""}
      to={"Jack"}
      currentMessage={[{ "from_host": "Jack" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render video from different", () => {
  const { getByTestId } = render(
    <Chat
      from={""}
      to={"Jack"}
      currentMessage={[{ "from_host": "Jack" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "video", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render image from different", () => {
  const { getByTestId } = render(
    <Chat
      from={""}
      to={"Jack"}
      currentMessage={[{ "from_host": "Jack" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "image", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render audio from different", () => {
  const { getByTestId } = render(
    <Chat
      from={""}
      to={"Jack"}
      currentMessage={[{ "from_host": "Jack" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "audio", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render Text current", () => {
  const { getByTestId } = render(
    <Chat
      from={"Jack"}
      to={"Liam"}
      currentMessage={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render video current", () => {
  const { getByTestId } = render(
    <Chat
      from={"Jack"}
      to={"Liam"}
      currentMessage={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "video", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render image current", () => {
  const { getByTestId } = render(
    <Chat
      from={"Jack"}
      to={"Liam"}
      currentMessage={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "image", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render audio current", () => {
  const { getByTestId } = render(
    <Chat
      from={"Jack"}
      to={"Liam"}
      currentMessage={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "audio", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render text current, from different", () => {
  const { getByTestId } = render(
    <Chat
      from={"Liam"}
      to={"Jack"}
      currentMessage={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render video current, from different", () => {
  const { getByTestId } = render(
    <Chat
      from={"Liam"}
      to={"Jack"}
      currentMessage={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "video", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render image current, from different", () => {
  const { getByTestId } = render(
    <Chat
      from={"Liam"}
      to={"Jack"}
      currentMessage={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "image", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

test("Test Render audio current, from different", () => {
  const { getByTestId } = render(
    <Chat
      from={"Liam"}
      to={"Jack"}
      currentMessage={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "audio", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      time={"12:24:00"}
      // eslint-disable-next-line react/no-access-state-in-setstate
      previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
      displayVideo={"none"}
    />);
});

// test ( "Test Shallow", () => {
//   const wrapper = shallow(<Chat
//     from={"Jack"}
//     to={"Liam"}
//     currentMessage={[{"from_host" : "Jack", "message_type":"text"}]}
//     time={"12:24:00"}
//     // eslint-disable-next-line react/no-access-state-in-setstate
//     previousMessages={[{"from_host" : "Jack"}]}
//     displayVideo={"none"}
//   />);
//   expect(wrapper.instance()).toBe(null);
// });