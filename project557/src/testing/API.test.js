
/* eslint-disable*/
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as funcs from "../components/getData";

Enzyme.configure({ adapter: new Adapter() });

test("Test getUsers ", () => {
    const respond = funcs.getUsers();
    expect(respond).not.toBe(null);
});

test("Test joinChat ", () => {
    const respond = funcs.joinChat("Jack");
    expect(respond).not.toBe(null);
});

test("Test sendMessage ", () => {
    const respond = funcs.sendMessage("Jack", "Liam", "Hello");
    expect(respond).not.toBe(null);
});

test("Test sendImage ", () => {
    const respond = funcs.sendImage("Jack", "Liam", "asdfasdfasdfasfsafasdfsdafasdfasdf");
    expect(respond).not.toBe(null);
});

test("Test sendAudio ", () => {
    const respond = funcs.sendAudio("Jack", "Liam", "asdfasdfasdfasfsafasdfsdafasdfasdf");
    expect(respond).not.toBe(null);
});

test("Test sendVideo ", () => {
    const respond = funcs.sendVideo("Jack", "Liam", "asdfasdfasdfasfsafasdfsdafasdfasdf");
    expect(respond).not.toBe(null);
});

test("Test getMessage ", () => {
    const respond = funcs.getMessage("Jack", "Liam");
    expect(respond).not.toBe(null);
});

test("Test postStory ", () => {
    const respond = funcs.postStory("Jack", "Hello", "afcfasdsadfasdfsadf");
    expect(respond).not.toBe(null);
});

test("Test getStory ", () => {
    const respond = funcs.getStory("Jack");
    expect(respond).not.toBe(null);
});

test("Test getFriends ", () => {
    const respond = funcs.getFriends("Jack");
    expect(respond).not.toBe(null);
});

test("Test getStrangers ", () => {
    const respond = funcs.getStrangers("Jack");
    expect(respond).not.toBe(null);
});

test("Test deleteFriend ", () => {
    const respond = funcs.deleteFriend("Jack", "Liam");
    expect(respond).not.toBe(null);
});

test("Test addFriend ", () => {
    const respond = funcs.addFriend("Jack", "Liam");
    expect(respond).not.toBe(null);
});

test("Test deleteUser ", () => {
    const respond = funcs.deleteUser("Jack");
    expect(respond).not.toBe(null);
});

test("Test updatePassword ", () => {
    const respond = funcs.updatePassword("Jack", "abc123");
    expect(respond).not.toBe(null);
});

test("Test getAtUser ", () => {
    const respond = funcs.getAtUser("Jack");
    expect(respond).not.toBe(null);
});

test("Test deleteMessageInDataBase ", () => {
    const respond = funcs.deleteMessageInDataBase("1");
    expect(respond).not.toBe(null);
});

test("Test deleteCurrentMessageInDataBase ", () => {
    const respond = funcs.deleteCurrentMessageInDataBase("12:50:30");
    expect(respond).not.toBe(null);
});

test("Test deleteConversationInDataBase ", () => {
    const respond = funcs.deleteConversationInDataBase("Jack", "Liam");
    expect(respond).not.toBe(null);
});

test("Test deleteConversationInDataBase ", () => {
    const respond = funcs.getStory2("Jack");
    expect(respond).not.toBe(null);
});