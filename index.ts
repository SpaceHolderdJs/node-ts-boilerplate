import * as fs from "node:fs/promises";
import axios from "axios";
const AxiosResponse = require("axios").AxiosResponse;

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then(function (responce: typeof AxiosResponse) {
    responce.data.forEach((element: User) => {
      fs.writeFile(
        `./files/users/${element.username}.html`,
        JSON.stringify(element)
      );
    });
  });
