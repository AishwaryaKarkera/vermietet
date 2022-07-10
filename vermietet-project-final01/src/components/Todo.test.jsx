import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { Todo } from "./Todo";
var config = require("../config.json");

test("rendering and checking Todo component", async () => {
  var tempTodo = {
    gender: "female",
    name: { title: "Ms", first: "Florence", last: "Mcdonalid" },
    location: {
      street: { number: 3291, name: "W Sherman Dr" },
      city: "Wilmington",
      state: "South Carolina",
      country: "United States",
      postcode: 58713,
      coordinates: { latitude: "81.7436", longitude: "3.6663" },
      timezone: { offset: "-11:00", description: "Midway Island, Samoa" },
    },
    email: "florence.mcdonalid@example.com",
    login: {
      uuid: "59f05efc-8151-44f3-ada3-e1ad35493792",
      username: "browntiger184",
      password: "pain",
      salt: "fugp9oi1",
      md5: "6de58af55c7bda1aa4360541e5e445bc",
      sha1: "160046da4a7fd93a20a377e1284eb39e8af517db",
      sha256: "837c61a5ef88fdcf6413f11058e3d8a8860cd6b1a1aedd6d77172c44110f05de",
    },
    dob: { date: "1982-02-15T10:04:15.325Z", age: 40 },
    registered: { date: "2019-07-25T13:12:08.438Z", age: 2 },
    phone: "(425) 345-1988",
    cell: "(448) 814-1645",
    id: { name: "SSN", value: "278-85-7180" },
    picture: {
      large: "https://randomuser.me/api/portraits/women/22.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/22.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/22.jpg",
    },
    nat: "US",
    testing: true
  };
  render(
    <Todo key={"test-todo-1"} todo={tempTodo} config={config} isCompleted={tempTodo.completed} onChange={() => { }} />
  );
  var dd = document.getElementsByName('todo')
  expect(dd).toBeTruthy();
});


test('test names', async () => {
  const names = {
    name: {
      title: 'mr',
      first: 'Arslan',
      last: 'Ahmed'
    }
  }
  const getNames = (names) => { //get name object and organize according to output e.g( Mr firstName Lastname)
    if (names === Object(names)) {
      let formattedName = ''
      if (names.name !== undefined && names.name != null) {
        for (const [key, value] of Object.entries(names.name)) {
          formattedName += " " + value;
        }
        return formattedName;

      } else {
        return "No name";
      }
    }
  };
  expect(getNames(names)).toBe(' mr Arslan Ahmed')
})


test('test names', async () => {
  const location = {
    name: 'mystreet',
    number: '5',
    postcode: '23'
  }
  const getLocation = (location) => {
    const myStreetName = location.name;
    const myStreetNumber = location.number;
    const myPostcode = location.postcode;
    return myStreetName + ' ' + myStreetNumber + ' ' + myPostcode
  }

  expect(getLocation(location)).toBe('mystreet 5 23')
})