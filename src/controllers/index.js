
require('dotenv').config();
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

/**
    IBM Watson config
*/
const visualRecognition = new VisualRecognitionV3({
    version: '2018-03-19',
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_WATSON_API_KEY,
    }),
    url: process.env.IBM_WATSON_API_URL
});

exports.fetchText = async function (req, res, next) {
    try {
        /**
            get the file data via multer
        */
        const file = req.file.buffer

        const classifyParams = {
            imagesFile: file,
            threshold: 0.6,
        };

        const response = await visualRecognition.classify(classifyParams);

        res.status(200).json({ result: response.result })
    } catch (error) {
        const err = new Error(error)
        return next(err);
    }
}
