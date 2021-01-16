// http://knexjs.org/#Installation-client for MySQL connection

/* eslint-disable*/
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: "database-2.csbfoctizqsu.us-west-2.rds.amazonaws.com",
      user: "admin",
      password: "Cis557eric",
      database: "db",
    },
    useNullAsDefault: true,
  });
  
  const request = require('supertest');
  const three = require('./chatserver.js');
  const webapp = three.webapp;
  const serverFD = three.serverFD;
  const wsconnect = three.connection

  const wss = require('./wsserver.js');
  
  // cleanup the database after each test
  const clearDatabase = async () => {
    await knex('Users').where('username', 'testuser').del();
  };
  
  /**
   * If you get an error with afterEach
   * inside .eslintrc.json in the
   * "env" key add -"jest": true-
   */

  afterEach(async () => {
    await clearDatabase();
  });
  
  describe('unit & integration test', () => {
    // expected response
    const testPlayer = {
      name: 'testuser',
      points: 0,
    };

    test('1 /', () => request(webapp).get('/').expect(200));


    test('2 register unit', () => request(webapp).post('/register').send('username=testuser')
      .expect(400)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('3 register integ', () => request(webapp).post('/register').send('username=testuser')
      .expect(400)
      .then(async () => {
        const newPlayer = await knex.select('username').from('Users').where('username', '=', 'testuser');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));


    test('4 register unit', () => request(webapp).post('/register').send('password=123abc')
      .expect(400)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('5 register integ', () => request(webapp).post('/register').send('password=123abc')
      .expect(400)
      .then(async () => {
        const newPlayer = await knex.select('username').from('Users').where('username', '=', 'testuser');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('6 register unit', () => request(webapp).post('/register').send('username=testuser&password=123abc')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('7 register integ', () => request(webapp).post('/register').send('username=testuser&password=123abc')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('username').from('Users').where('username', '=', 'testuser');
        expect(JSON.stringify(newPlayer)).toBe('[{"username":"testuser"}]');
      }));
      
    test('8 login unit', () => request(webapp).post('/login').send('username=Dick&password=e99a18c428cb38d5f260853678922e03')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('9 login integ', () => request(webapp).post('/login').send('username=Dick&password=e99a18c428cb38d5f260853678922e03')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('username').from('Users').where('username', '=', 'Dick');
        expect(JSON.stringify(newPlayer)).toBe('[{"username":"Dick"}]');
      }));

    test('10 login unit', () => request(webapp).post('/login').send('password=e99a18c428cb38d5f260853678922e03')
      .expect(400)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('11 login integ', () => request(webapp).post('/login').send('password=e99a18c428cb38d5f260853678922e03')
      .expect(400)
      .then(async () => {
        const newPlayer = await knex.select('username').from('Users').where('username', '=', 'Dick');
        expect(JSON.stringify(newPlayer)).toBe('[{"username":"Dick"}]');
      }));

    test('12 checkin unit', () => request(webapp).post('/checkin').send('username=Dick')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('13 checkin integ', () => request(webapp).post('/checkin').send('username=Dick')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('username').from('Users').where('username', '=', 'Dick');
        expect(JSON.stringify(newPlayer)).toBe('[{"username":"Dick"}]');
      }));

    test('14 checkin unit', () => request(webapp).post('/checkin').send('')
      .expect(400)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('15 checkin integ', () => request(webapp).post('/checkin').send('')
      .expect(400)
      .then(async () => {
        const newPlayer = await knex.select('username').from('Users').where('username', '=', 'Dick');
        expect(JSON.stringify(newPlayer)).toBe('[{"username":"Dick"}]');
      }));

    test('16 users unit', () => request(webapp).get('/users').send('')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('17 users integ', () => request(webapp).get('/users').send('')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('username').from('Users').where('username', '=', 'Dick');
        expect(JSON.stringify(newPlayer)).toBe('[{"username":"Dick"}]');
      }));

    test('18 video unit', () => request(webapp).post('/video').send('from=Dick&to=Liam&file=integtest')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('19 video integ', () => request(webapp).post('/video').send('from=Dick&to=Liam&file=integtest')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Messages').where('from_host', '=', 'Dick').where('to_host', '=', 'Liam').where('message_type', '=', 'video');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('20 audio unit', () => request(webapp).post('/audio').send('from=Dick&to=Liam&file=integtest')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('21 audio integ', () => request(webapp).post('/audio').send('from=Dick&to=Liam&file=integtest')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Messages').where('from_host', '=', 'Dick').where('to_host', '=', 'Liam').where('message_type', '=', 'audio');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));    
      
    test('22 image unit', () => request(webapp).post('/image').send('from=Dick&to=Liam&file=integtest')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('23 image integ', () => request(webapp).post('/image').send('from=Dick&to=Liam&file=integtest')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Messages').where('from_host', '=', 'Dick').where('to_host', '=', 'Liam').where('message_type', '=', 'image');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('24 message unit', () => request(webapp).post('/message').send('from=Dick&to=Liam&message=integtest')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('25 message integ', () => request(webapp).post('/message').send('from=Dick&to=Liam&message=integtest')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Messages').where('from_host', '=', 'Dick').where('to_host', '=', 'Liam').where('message_type', '=', 'text');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('26 message unit', () => request(webapp).post('/message').send('from=Dick&message=integtest')
      .expect(400)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('27 message integ', () => request(webapp).post('/message').send('from=Dick&message=integtest')
      .expect(400)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Messages').where('from_host', '=', 'Dick').where('to_host', '=', 'Liam').where('message_type', '=', 'text');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('28 messagetest unit', () => request(webapp).get('/messagetest/' + '{"from":"Dick", "to":"Liam"}')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('29 messagetest integ', () => request(webapp).get('/messagetest/' + '{"from":"Dick", "to":"Liam"}')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Messages').where('from_host', '=', 'Dick').where('to_host', '=', 'Liam');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('28 1 messagetest unit', () => request(webapp).get('/messagetest/' + '{"to":"Liam"}')
      .expect(400)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('29 1 messagetest integ', () => request(webapp).get('/messagetest/' + '{"to":"Liam"}')
      .expect(400)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Messages').where('from_host', '=', 'Dick').where('to_host', '=', 'Liam');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('30 poststory unit', () => request(webapp).post('/poststory').send('from=Dick&text=integtest&file=test')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('31 poststory integ', () => request(webapp).post('/poststory').send('from=Dick&text=integtest&file=test')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Post').where('from_host', '=', 'Dick');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('32 getstory unit', () => request(webapp).get('/getstory/' + "Dick")
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('33 getstory integ', () => request(webapp).get('/getstory/' + "Dick")
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Post').where('from_host', '=', 'Dick');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('34 getstory2 unit', () => request(webapp).get('/getstory2/' + "Dick")
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('35 getstory2 integ', () => request(webapp).get('/getstory2/' + "Dick")
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Post').where('from_host', '=', 'Dick');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('36 getfriends unit', () => request(webapp).get('/getfriends/' + "Dick")
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('37 getfriends integ', () => request(webapp).get('/getfriends/' + "Dick")
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Post').where('from_host', '=', 'Dick');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('38 getstrangers unit', () => request(webapp).get('/getstrangers/' + "Dick")
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('39 getstrangers integ', () => request(webapp).get('/getstrangers/' + "Dick")
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('message_content').from('Post').where('from_host', '=', 'Dick');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('42 addfriend unit', () => request(webapp).get('/addfriend/' + "Jack&Liam")
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('43 addfriend integ', () => request(webapp).get('/addfriend/' + "Jack&Liam")
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('fid').from('Friends').where('host', '=', 'Jack');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('40 deletefriend unit', () => request(webapp).del('/deletefriend/').send("username=Jack&friend=Liam")
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('41 deletefriend integ', () => request(webapp).del('/deletefriend/').send("username=Jack&friend=Liam")
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('fid').from('Friends').where('host', '=', 'Jack').where('friend', '=', 'Liam');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('42 deleteuser unit', () => request(webapp).del('/deleteuser/').send("username=testuser")
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('43 deleteuser integ', () => request(webapp).del('/deleteuser/').send("username=testuser")
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Users').where('username', '=', 'testuser');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('44 updatepassword unit', () => request(webapp).post('/updatepassword').send('username=Dick&newPassword=e99a18c428cb38d5f260853678922e03')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('45 updatepassword integ', () => request(webapp).post('/updatepassword').send('username=Dick&newPassword=e99a18c428cb38d5f260853678922e03')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Users').where('username', '=', 'Dick').where('password', '=', 'e99a18c428cb38d5f260853678922e03');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('46 exist unit', () => request(webapp).get('/exist/' + "Dick")
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('47 exist integ', () => request(webapp).get('/exist/' + "Dick")
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Users').where('username', '=', 'Dick');
        expect(JSON.stringify(newPlayer)).not.toBe('[]');
      }));

    test('48 exist unit', () => request(webapp).get('/exist/' + "NotExist")
      .expect(400)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('49 exist integ', () => request(webapp).get('/exist/' + "NotExist")
      .expect(400)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Users').where('username', '=', 'NotExist');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('50 deletemessage unit', () => request(webapp).post('/deletemessage').send('mid=500')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('51 deletemessage integ', () => request(webapp).post('/deletemessage').send('mid=500')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Messages').where('mid', '=', '500');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('52 deletecurrentmessage unit', () => request(webapp).post('/deletecurrentmessage').send('time_raw=1000')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('53 deletecurrentmessage integ', () => request(webapp).post('/deletecurrentmessage').send('time_raw=2020-8-14T06:50:13')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Messages').where('message_time', '=', '2020-8-14 06:50:13');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('54 deleteconversation unit', () => request(webapp).post('/deleteconversation').send('from=Jack&to=Liam')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('55 deleteconversation integ', () => request(webapp).post('/deleteconversation').send('from=Jack&to=Liam')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Messages').where('from_host', '=', 'Jack').where('to_host', '=', 'Liam');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('56 userpair unit', () => request(webapp).post('/userpair').send('from=Jack&to=Liam')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('57 userpair integ', () => request(webapp).post('/userpair').send('from=Jack&to=Liam')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Messages').where('from_host', '=', 'Jack').where('to_host', '=', 'Liam');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('58 userpair unit', () => request(webapp).post('/userpair').send('to=Liam')
      .expect(400)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('59 userpair integ', () => request(webapp).post('/userpair').send('to=Liam')
      .expect(400)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Messages').where('from_host', '=', 'Jack').where('to_host', '=', 'Liam');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('60 disconnect unit', () => request(webapp).post('/disconnect').send('from=Liam')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('61 disconnect integ', () => request(webapp).post('/disconnect').send('from=Liam')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Messages').where('from_host', '=', 'Jack').where('to_host', '=', 'Liam');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('62 disconnect unit', () => request(webapp).post('/disconnect').send('')
      .expect(400)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('63 disconnect integ', () => request(webapp).post('/disconnect').send('')
      .expect(400)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Messages').where('from_host', '=', 'Jack').where('to_host', '=', 'Liam');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('64 updateallmessagetoread unit', () => request(webapp).post('/updateallmessagetoread').send('from=Jack&to=Liam')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('65 updateallmessagetoread integ', () => request(webapp).post('/updateallmessagetoread').send('from=Jack&to=Liam')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Messages').where('from_host', '=', 'Jack').where('to_host', '=', 'Liam');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('66 updateallmessagetoread unit', () => request(webapp).post('/updateallmessagetoread').send('from=Jack')
      .expect(400)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('67 updateallmessagetoread integ', () => request(webapp).post('/updateallmessagetoread').send('from=Jack')
      .expect(400)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Messages').where('from_host', '=', 'Jack').where('to_host', '=', 'Liam');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));

    test('68 updatelastvisitposttime unit', () => request(webapp).post('/updatelastvisitposttime').send('username=Jack&lastTime=1000')
      .expect(200)
      .then((response) => {
        expect(response).not.toBe(null);
      }));
  
    test('69 updatelastvisitposttime integ', () => request(webapp).post('/updatelastvisitposttime').send('username=Jack&lastTime=1000')
      .expect(200)
      .then(async () => {
        const newPlayer = await knex.select('*').from('Messages').where('from_host', '=', 'Jack').where('to_host', '=', 'Liam');
        expect(JSON.stringify(newPlayer)).toBe('[]');
      }));
      serverFD.close();
      wsconnect.close();
      wss.close();
  });
  