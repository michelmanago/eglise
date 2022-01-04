const nextTranslate = require('next-translate');

const nextTranslateConfig = nextTranslate();
module.exports = {
    ...nextTranslateConfig,
    images: {
        domains: [process.env.UPLOAD_SERVER_HOST],
    },
};
