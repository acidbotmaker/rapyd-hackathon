import bcrypt from 'bcryptjs';

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("asbcde", 10),
    isAdmin: true,
  },
  {
    name: "Tamizhan",
    email: "tamizhan@example.com",
    password: bcrypt.hashSync("asbcde", 10),
  },
  {
    name: "Krishnan",
    email: "krishnan@example.com",
    password: bcrypt.hashSync('asbcde',10),
  },
  {
    name: "Murugan",
    email: "murugan@example.com",
    password: bcrypt.hashSync('asbcde',10),
  },
];


export default users;