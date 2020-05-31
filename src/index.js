import express from "express";
import cors from "cors";

import "dotenv/config";
import con from "./mysql";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () =>
    console.log(`Registration service listening on port ${process.env.PORT}!`)
);

// POST api to register user
app.post("/register", (req, res) => {
    const { body: { name, email, password, topic } = {} } = req;

    if (name && email && password && topic) {
        console.log("Register Request received");
        con.connect(err => {
            con.query(
                `INSERT INTO ccgroup7.users (name, email, password, topic)
                    VALUES ('${name}', '${email}', '${password}', '${topic}')`,
                (err, result, fields) => {
                    if (err) res.send(err);
                    if (result) res.send(result);
                }
            );
        });
    } else {
        console.log("Missing a parameter");
    }
});
