import http, {IncomingMessage, ServerResponse} from 'http';
import * as path from 'node:path';
import * as fs from 'node:fs';

const sendJsonResponse = (res: ServerResponse, message: string) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({data: message}));
};

const readMockData = () => {
    const mockData = fs.readFileSync(path.join(__dirname, 'MOCK_DATA.json'), 'utf8');
    return JSON.parse(mockData);
};

const writeMockData = (data: any) => {
    fs.writeFileSync(path.join(__dirname, 'MOCK_DATA.json'), JSON.stringify(data));
};

const methodHandlers: Record<string, (req: IncomingMessage, res: ServerResponse) => void> = {
    GET: (req, res) => {
        try {
            sendJsonResponse(res, readMockData());
        } catch (error) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: 'Error reading mock data'}));
        }
    },
    POST: (req, res) => {
        try {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const newRecord = JSON.parse(body);
                    const existingData = readMockData();

                    existingData.push(newRecord);

                    writeMockData(existingData);

                    sendJsonResponse(res, newRecord);
                } catch (error) {
                    res.end('Invalid JSON data');
                }
            });
            sendJsonResponse(res, 'this was a POST request');
        } catch (error) {
            res.end('Something went wrong');
        }
    },
    DELETE: (req, res) => {
        try {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    const {id} = JSON.parse(body);
                    const existingData = readMockData();

                    const user = existingData.find((user: any) => user.id === id);
                    if (user) {
                        const newData = existingData.filter((user: any) => user.id !== id);
                        writeMockData(newData);
                        sendJsonResponse(res, user);
                    }

                } catch (error) {
                    res.end('Something went wrong trying to delete a user');
                }
            });
        } catch (error) {
            res.end('Something wend wrong');
        }
    },
    PATCH: (req, res) => {
        try {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const {id, ...newData} = JSON.parse(body);
                    const existingData = readMockData();

                    const user = existingData.find((user: any) => user.id === id);

                    if (user) {
                        const index = existingData.indexOf(user);

                        Object.keys(newData).forEach(key => {
                            existingData[index][key] = newData[key];
                        });


                        writeMockData(existingData);
                        sendJsonResponse(res, existingData[index]);
                    }
                } catch (error) {
                    res.end('Invalid JSON data');
                }
            });
            sendJsonResponse(res, 'this was a POST request');
        } catch (error) {
            res.end('Something went wrong');
        }
    },
};

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const {method} = req;

    if (method && methodHandlers[method]) {
        methodHandlers[method](req, res);
    } else {
        res.writeHead(405, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Method not allowed'}));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const newUser = {
    id: Math.round(Math.random() * 100),
    name: 'Kala4',
    age: Math.round(Math.random() * 100),
    email: 'kala4@gmail.com',
    skills: ['angular', 'nest'],
    city: 'New York'
};

const newUserDataStringified = JSON.stringify(newUser);

const postOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': newUserDataStringified.length,
    }
};

const updatedUser = {
    id: 2,
    name: 'Oleg',
    city: 'bolotto'
};

const updatedUserDataStringified = JSON.stringify(updatedUser);

const patchOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': updatedUserDataStringified.length,
    }
};

const userIdToDelete = 3;

const deleteOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify({id: userIdToDelete}).length,
    }
};

http.get("http://localhost:3000")
http.request(postOptions).write(newUserDataStringified);
http.request(deleteOptions).write(JSON.stringify({id: userIdToDelete}));
http.request(patchOptions).write(updatedUserDataStringified);
