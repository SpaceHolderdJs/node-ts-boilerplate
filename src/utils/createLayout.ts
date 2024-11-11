import { UserType } from "../types";

export const createLayout = (user: UserType) => {
  return `
    <div class="user-profile">
      <h1>${user.name} (@${user.username})</h1>
      <p>Email: <a href="mailto:${user.email}">${user.email}</a></p>
      <p>Phone: ${user.phone}</p>
      <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
      
      <section class="address">
        <h2>Address</h2>
        <p>${user.address.suite}, ${user.address.street}</p>
        <p>${user.address.city}, ${user.address.zipcode}</p>
        <p>Geo: (${user.address.geo.lat}, ${user.address.geo.lng})</p>
      </section>
      
      <section class="company">
        <h2>Company</h2>
        <p>${user.company.name}</p>
        <p>Catchphrase: "${user.company.catchPhrase}"</p>
        <p>Business: ${user.company.bs}</p>
      </section>
    </div>
  `;
};
