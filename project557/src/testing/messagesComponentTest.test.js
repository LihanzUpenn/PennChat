/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import MessagesComponent from "../components/Chat";

import Enzyme, { shallow } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });
import { BrowserRouter as Router } from 'react-router-dom';

test("Test Render MessagesComponent", () => {
    render(
        <MessagesComponent
            currentMessageHtml={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
            from={"Jack"}
            to={"Liam"}
            previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
            displayVideo={"asfasdfasdfasdfasdfasdf"}
            currentPair={["Jack", "Liam"]}
        />
    )
    const div2 = document.getElementById("MessageBox");
    expect(div2).not.toBeNull();
    document.getElementById("msg").innerHTML = "abc";
});