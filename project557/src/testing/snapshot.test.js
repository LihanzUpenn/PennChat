/* eslint-disable*/
import React from "react";
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';
import Main from '../components/Main';
import App from '../components/App';
import Chat from '../components/Chat';
import Contacts from "../components/Contacts";
import Home from "../components/Home";
import MessagesComponent from "../components/Chat";
import NavigationBar from "../components/NavigationBar";
import Post from "../components/Post";
import ProfileOther from "../components/ProfileOther";
import Profile from "../components/Profile";
import Register from "../components/Register";
import Story from "../components/Story";
import Stranger from "../components/Stranger";
import Timer from "../components/Timer";
import TopBanner from "../components/TopBanner";
const renderer = require('react-test-renderer');

test("Wnether Login page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <App />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether Chat page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <Chat 
          from={""}
          to={"Jack"}
          currentMessage={[{ "from_host": "Jack" }]}
          time={"12:24:00"}
          previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
          displayVideo={"none"}
    />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether Contacts page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <Contacts />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether Home page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <Home />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether Login page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/login']}>
    <Login />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether Main page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <Main />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test("Wnether MessagesComponent page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
        <MessagesComponent
            currentMessageHtml={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
            from={"Jack"}
            to={"Liam"}
            previousMessages={[{ "from_host": "Jack", "to_host": "Liam", "message_type": "text", "message_time": "2020-11-28T05:13:07", "message_content": "Jeffrey@abc123 acbacbacbacbabcbscba" }]}
            displayVideo={"asfasdfasdfasdfasdfasdf"}
            currentPair={["Jack", "Liam"]}
        />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether NavigationBar page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <NavigationBar />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether Post page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <Post />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

// test("Wnether ProfileOther page matches snapshot", () => {
//     const component = renderer.create(
//     <MemoryRouter initialEntries={['/']}>
//     <ProfileOther />
//     </MemoryRouter>
//     );
//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });


test("Wnether Profile page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <Profile />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether Register page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <Register />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether Story page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <Story />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether Stranger page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <Stranger />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether Timer page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <Timer />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Wnether TopBanner page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <TopBanner />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test("Wnether videoCall page matches snapshot", () => {
    const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
    <videoCall />
    </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});