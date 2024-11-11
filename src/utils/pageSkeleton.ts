export const pageSkeleton = (content: string) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Profile</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f9;
          }
          .user-profile {
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
          }
          .user-profile h1 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          .user-profile p, .user-profile a {
            font-size: 16px;
            color: #333;
          }
          .user-profile a {
            color: #0073e6;
            text-decoration: none;
          }
          .user-profile a:hover {
            text-decoration: underline;
          }
          .address, .company {
            margin-top: 20px;
          }
          h2 {
            font-size: 20px;
            color: #555;
          }
        </style>
      </head>
      <body>
       ${content}
      </body>
    </html>`;
};
