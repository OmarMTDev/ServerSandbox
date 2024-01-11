const express = require("express");
const cors = require("cors");


const app = express();
const port = 1339;

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

app.get("/v1/Exports/Participants/Days/:day", cors(), fetchData);

//"Fetch data triggers a get to: /v1/Exports/Participants/Days/2023-12-19";

async function fetchData(req, res) {
    const client = require("twilio")(accountSid, authToken);
    client.bulkexports.v1
        .exports("Participants")
        .days(req.params.day)
        .fetch()
        .then(async (day) => {
            res.send(`<script> window.location.replace("${day.redirectTo}"); </script>`);
        });
}

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
