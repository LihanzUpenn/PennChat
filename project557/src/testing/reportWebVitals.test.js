
/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import reportWebVitals from "../reportWebVitals";

Enzyme.configure({ adapter: new Adapter() });

describe('Test reportWebVitals', () => { 
    it('test reportWebVitals', () => { 
        const respond = reportWebVitals(() => {});
        expect(respond).not.toBe(null);
    });
});