/* eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';  
import Adapter from 'enzyme-adapter-react-16';

import * as funcs from "../components/notifications";

Enzyme.configure({ adapter: new Adapter() });

test ( "Test setupWSConnection ", () => {
    sessionStorage.setItem("token", "x");
    const respond = funcs.setupWSConnection(() => {}, () => {}, [
        {from_host: "Liam",
    message_content: " Hello!",
    message_time: "2020-12-04T07:14:12",
    message_type: "text",
    rawtime: "2020-12-04 07:14:12",
    status: "read"}
], "Jack", [], "Liam", [
    {from_host: "Liam",
message_content: "hi",
message_time: "2020-12-04T03:41:19.000Z",
message_type: "text",
mid: 537,
status: "read",
time_raw: "2020-12-03 22:41:19",
to_host: "Lili"
}
]);
    expect(respond).not.toBe(null);
});

test ( "Test helper delivered", () => {
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, [        {from_host: "Liam",
    message_content: " Hello!",
    message_time: "2020-12-04T07:14:12",
    message_type: "text",
    rawtime: "2020-12-04 07:14:12",
    status: "read"}], "Jack", [], "Liam", [    {from_host: "Liam",
    message_content: "hi",
    message_time: "2020-12-04T03:41:19.000Z",
    message_type: "text",
    mid: 537,
    status: "read",
    time_raw: "2020-12-03 22:41:19",
    to_host: "Lili"
    }], {from: "Liam",
    status: "read",
    text: "Hello!",
    time: "2020-12-04 07:14:12",
    type: "delivered"});
    expect(respond).not.toBe(null);
});


test ( "Test helper new message", () => {
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, [        {from_host: "Liam",
    message_content: " Hello!",
    message_time: "2020-12-04T07:14:12",
    message_type: "text",
    rawtime: "2020-12-04 07:14:12",
    status: "read"}], "Jack", [], "Liam", [    {from_host: "Liam",
    message_content: "hi",
    message_time: "2020-12-04T03:41:19.000Z",
    message_type: "text",
    mid: 537,
    status: "read",
    time_raw: "2020-12-03 22:41:19",
    to_host: "Lili"
    }], {from: "Liam",
    status: "read",
    text: "Hello!",
    time: "2020-12-04 07:14:12",
    type: "new message"});
    expect(respond).not.toBe(null);
});




test ( "Test helper new user", () => {
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, [        {from_host: "Liam",
    message_content: " Hello!",
    message_time: "2020-12-04T07:14:12",
    message_type: "text",
    rawtime: "2020-12-04 07:14:12",
    status: "read"}], "Jack", [], "Liam", [    {from_host: "Liam",
    message_content: "hi",
    message_time: "2020-12-04T03:41:19.000Z",
    message_type: "text",
    mid: 537,
    status: "read",
    time_raw: "2020-12-03 22:41:19",
    to_host: "Lili"
    }], {from: "Liam",
    status: "read",
    text: "Hello!",
    time: "2020-12-04 07:14:12",
    type: "new user"});
    expect(respond).not.toBe(null);
});

test ( "Test helper image delivered", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, [        {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"} ], "Jack", [], "Liam", [    {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"}
], {type: "image delivered", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", imgUrl:{buffer:"asdfadfasdfsadfa"}});
    expect(respond).not.toBe(null);
});


test ( "Test helper new image message", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, [        {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"} ], "Jack", [], "Liam", [    {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"}
], {type: "new image message", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", imgUrl:{buffer:"asdfadfasdfsadfa"}});
    expect(respond).not.toBe(null);
});

test ( "Test helper aduio delivered", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, [        {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"} ], "Jack", [], "Liam", [    {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"}
], {type: "aduio delivered", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", audiofile:{buffer:"asdfadfasdfsadfa"}});
    expect(respond).not.toBe(null);
});


test ( "Test helper new audio message", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, [        {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"} ], "Jack", [], "Liam", [    {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"}
], {type: "new audio message", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", audiofile:{buffer:"asdfadfasdfsadfa"}});
    expect(respond).not.toBe(null);
});


test ( "Test helper video delivered", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, [        {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"} ], "Jack", [], "Liam", [    {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"}
], {type: "video delivered", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", videofile:{buffer:"asdfadfasdfsadfa"}});
    expect(respond).not.toBe(null);
});


test ( "Test helper new video message", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, 
    [        {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"} ]
    , "Jack", [], "Liam", [    {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"}
], {type: "new video message", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", videofile:{buffer:"asdfadfasdfsadfa"}});
    expect(respond).not.toBe(null);
});


test ( "Test helper newUserPair 1", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, 
    [{from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}], 
    "Jack", [], "Liam", [    {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"}
], {type: "newUserPair", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", pair:{"Liam":"Jack"}});
    expect(respond).not.toBe(null);
});


test ( "Test helper newUserPair 2", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, 
    [{from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "audio",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}], 
    "Jack", [], "Liam", [    {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"}
], {type: "newUserPair", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", pair:{"Liam":"Jack"}});
    expect(respond).not.toBe(null);
});


test ( "Test helper newUserPair 3", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, 
    [{from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "video",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}], 
    "Jack", [], "Liam", [    {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"}
], {type: "newUserPair", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", pair:{"Liam":"Jack"}});
    expect(respond).not.toBe(null);
});


test ( "Test helper newUserPair 4", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, 
    [{from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "text",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}], 
    "Jack", [], "Liam", [    {from_host: "Lili",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: "read",
    time_raw: "2020-12-04 07:02:41",
    to_host: "Liam"}
], {type: "newUserPair", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", pair:{"Liam":"Jack"}});
    expect(respond).not.toBe(null);
});


test ( "Test helper newUserPair 5", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, 
    [{from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "text",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}], 
    "Jack", [], "Liam", [    {from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "image",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}
], {type: "newUserPair", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", pair:{"Liam":"Jack"}});
    expect(respond).not.toBe(null);
});


test ( "Test helper newUserPair 6", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, 
    [{from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "text",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}], 
    "Jack", [], "Liam", [    {from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "video",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}
], {type: "newUserPair", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", pair:{"Liam":"Jack"}});
    expect(respond).not.toBe(null);
});


test ( "Test helper newUserPair 7", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, 
    [{from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "text",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}], 
    "Jack", [], "Liam", [    {from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "audio",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}
], {type: "newUserPair", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", pair:{"Liam":"Jack"}});
    expect(respond).not.toBe(null);
});



test ( "Test helper newUserPair 8", () => {
    window.URL.createObjectURL = function() {};
    sessionStorage.setItem("token", "x");
    const respond = funcs.helper(() => {}, () => {}, 
    [{from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "text",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}], 
    "Jack", [], "Liam", [    {from_host: "Jack",
    message_content: "blob:http://localhost:3000/0814676f-7238-4ed9-bb91-5461f17c3a2c",
    message_time: "2020-12-04T12:02:41.000Z",
    message_type: "text",
    mid: 642,
    status: true,
    time_raw: "2020-12-04 07:02:41",
    to_host: "Jack"}
], {type: "newUserPair", to: "Liam", time: "2020-12-04 07:20:15", from: "Jack", pair:{"Liam":"Jack"}});
    expect(respond).not.toBe(null);
});

