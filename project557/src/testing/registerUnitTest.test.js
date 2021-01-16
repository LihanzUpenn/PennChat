/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';  
import Adapter from 'enzyme-adapter-react-16';
import Register from "../components/Register";
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

// eslint-disable-next-line
test ( "Test Render", () => {
    render(
        <Router>
          <Register />
        </Router>
      )
});

// it ("TEST handleConfirmBlur", () => {
//   const wrapper = shallow(<Register/>);
//   var event = new CustomEvent('build', { "target": { "name" : "Jack" , "value" : 1} });
//   expect(wrapper.instance().handleConfirmBlur(event) === undefined);
// });