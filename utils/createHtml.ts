import fs from 'fs/promises';
import * as path from 'node:path';

import {UserI} from '../interfaces/user.interface';

export const createHtmlPageForUser = async (user: UserI) => {
    const directory = path.join(__dirname, 'users')
    const htmlContent = `<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${user.name}</title>
</head>
<body>
<header>
    <h1>Hello, my name is <i>${user.name}</i></h1>
</header>
<main>
    <section>
        <h3>Information about me:</h3>
        <hr/>
        <p>My username is: <strong>${user.username}</strong></p>
        <p>My email is: <strong>${user.email}</strong></p>
        <p>My phone number is: <strong>${user.email}</strong></p>
        <p>My website is: <strong><a style="text-decoration: none; color: aquamarine" target="_blank" href="${user.website}">${user.website}</a></strong></p>
        <p>Current I live at <strong>${user.address.city}</strong></p>
        <hr>
        <p>I work at <strong>${user.company.name}</strong></p>
    </section>
</main>
</body>
</html>`

    await fs.writeFile(`users/${user.username}.html`, htmlContent)
};
