/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Videocall from "../components/Videocall";
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line
test("Test Render", () => {
  render(
    <Videocall />
  )
});