const axios = require('axios');
const mailApi = require('./mailapi');
const {
    access_token,
    organaizer_key,
    webinar_key,
    webinar_api_url
} = require('./consts');

const headers = {
    Authorization: access_token
};
const url = `${webinar_api_url}/organizers/${organaizer_key}/webinars/${webinar_key}/registrants`;

module.exports = function(req, res) {
    const {
        firstName,
        lastName,
        email,
    } = req.body;
    mailApi(req.body, () => {
        axios({
            method: 'post',
            url,
            headers,
            data: {
                firstName,
                lastName,
                email
            }
        })
            .then(response => {
                try{
                    res.json(response.data);
                }catch(err){
                    console.log(err);
                }

            })
            .catch(err => {
                console.log(err);
                handleWebiarError(err, res)
            });
    });

};

function handleWebiarError(err, res) {
    res.status(200);
    res.json({
        msg: "Error not valid user"
    })
}



