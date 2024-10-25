import { UserInterface } from "../types/user.intrface";
import { writeFile } from "fs/promises";

export class UserService {
  static async getUsers(url: string) {
    const userResponce = await fetch(url);
    const userData = await userResponce.json();
    return userData;
  }
  static async renderUsersData(users: UserInterface[]): Promise<void> {
    for (let user of users) {
      const userObj = new User(user);
      await writeFile(`./files/users/user-${user.id}.html`, userObj.render());
    }
  }
}

class User {
  constructor(private user: UserInterface) {
    this.user = user;
  }

  render(): string {
    return `<!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Card</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .card {
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                max-width: 300px;
                margin: auto;
            }
            .card h2 {
                margin: 0 0 10px;
            }
            .card p {
                margin: 5px 0;
                color: #555;
            }
            .address, .company {
                margin-top: 15px;
                border-top: 1px solid #eee;
                padding-top: 10px;
            }
        </style>
    </head>
    <body>
    
    <div class="card">
        <h2>${this.user.name}</h2>
        <p><strong>Username:</strong> ${this.user.username}</p>
        <p><strong>Email:</strong> ${this.user.email}</p>
        <p><strong>Phone:</strong> ${this.user.phone}</p>
        <p><strong>Website:</strong> <a href="${this.user.website}" target="_blank">${this.user.website}</a></p>
        
        <div class="address">
            <h3><strong>Адреса:</strong></h3>
            <p><strong>Вулиця:</strong> ${this.user.address.street}</p>
            <p><strong>Квартира:</strong> ${this.user.address.suite}</p>
            <p><strong>Місто:</strong> ${this.user.address.city}</p>
            <p><strong>Поштовий індекс:</strong> ${this.user.address.zipcode}</p>
        </div>
        
        <div class="company">
            <h3>Компанія:</h3>
            <p><strong>Назва:</strong> ${this.user.company.name}</p>
            <p><strong>Гасло:</strong> ${this.user.company.catchPhrase}</p>
            <p><strong>BS:</strong> ${this.user.company.bs}</p>
        </div>
    </div>
    
    </body>
    </html>
    `;
  }
}
