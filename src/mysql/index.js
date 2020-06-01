import "dotenv/config";
import mysql from "mysql";

import { DB_CREATION, TABLE_CREATION } from "./querries";

const CONNECTION_CONFIG = {
  host: process.env.MYSQL_ENDPOINT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD
};

const con = mysql.createConnection(CONNECTION_CONFIG);

con.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");

  // schema generation query
  con.query(DB_CREATION, (err, res) => {
    if (res) console.log('Schema created successfully!')
    if (err) console.error(err)
  });

  // user table creation script
  con.query(TABLE_CREATION, (err, res) => {
    if (res) console.log('Table created successfully!')
    if (err) console.error(err)
  });
});


export default con;
