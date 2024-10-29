import fs from 'fs/promises';
import path from 'path';

import {getUsers} from './services/user.service';
import {createHtmlPageForUser} from './utils/createHtml';

(async () => {
    const users = await getUsers();
    users.forEach(user => {
        createHtmlPageForUser(user);
    })
})();

// (async () => {
//     const files = await fs.readdir('users');
//     for (const file of files) {
//         const filePath = path.join('users', file);
//         await fs.rm(filePath);
//     }
// })();
