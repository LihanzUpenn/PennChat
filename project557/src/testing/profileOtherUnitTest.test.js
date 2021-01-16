/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';  
import Adapter from 'enzyme-adapter-react-16';
import ProfileOther from "../components/ProfileOther";
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line
test ( "Test Render", () => {
    render(
        <Router>
          <ProfileOther />
        </Router>
      )
});

it ("TEST handleGoBack", () => {
  const wrapper = shallow(<ProfileOther/>);
  expect(wrapper.instance().handleGoBack() === undefined);
});


