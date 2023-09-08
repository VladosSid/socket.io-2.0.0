// lsit users
let USERS = [
  {id: '123148shdjasd-asfhas', socketId: [], name: 'STEPaN', password: '123', online: true},
  {id: '234ds-asd34fdqwd32', socketId: [], name: 'Vlados', password: '123', online: false},
  {id: 'asd324f-ash43uds', socketId: [], name: 'TOPName', password: '123', online: true},
  {id: '42893dh-sjf38112dsa', socketId: [], name: 'АйКю999', password: '123', online: true},
  {id: '37wh0jsd-asjf328hs-sa', socketId: [], name: 'Гений', password: '123', online: false},
  {id: '4325hgavd-asjf328haass', socketId: [], name: 'SupetTester', password: '123', online: false},
  
]
// list rooms
let ROOMS = [{
  id: "635264", 
  nameRoom: 'MyTOPRoom', 
  owner: {
    id: '123148shdjasd-asfhas',
    name: 'STEPaN', 
  },
  member: [],
  messages: []
},
{
  id: "14783024-sdn341d", 
  nameRoom: 'SUPERchaT', 
  owner: {
    id: '234ds-asd34fdqwd32',
    name: 'Vlados', 
  },
  member: [{
    id: '234ds-asd34fdqwd32',
    name: 'Vlados', 
  },
  {
    id: 'asd324f-ash43uds', 
    name: 'TOPName',
  },
  ],
  messages: [
    {id: '213jsdafh34-sanfu53', message: "Hi...", owner: 'Vlados'},
    {id: '234ds-asd34f', message: "Hello:)", owner: 'TOPName'},
  ]
}]

module.exports = {USERS, ROOMS}