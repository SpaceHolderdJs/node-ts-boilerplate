import { User } from "../types/user.intrface";
export function createUserCard(data: User): string {
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
    <h2>${data.name}</h2>
    <p><strong>Username:</strong> ${data.username}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Website:</strong> <a href="${data.website}" target="_blank">${data.website}</a></p>
    
    <div class="address">
        <h3><strong>Адреса:</strong></h3>
        <p><strong>Вулиця:</strong> ${data.address.street}</p>
        <p><strong>Квартира:</strong> ${data.address.suite}</p>
        <p><strong>Місто:</strong> ${data.address.city}</p>
        <p><strong>Поштовий індекс:</strong> ${data.address.zipcode}</p>
    </div>
    
    <div class="company">
        <h3>Компанія:</h3>
        <p><strong>Назва:</strong> ${data.company.name}</p>
        <p><strong>Гасло:</strong> ${data.company.catchPhrase}</p>
        <p><strong>BS:</strong> ${data.company.bs}</p>
    </div>
</div>

</body>
</html>
`;
}
