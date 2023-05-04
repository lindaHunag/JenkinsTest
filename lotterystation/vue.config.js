const fs = require("fs");
/* const path = require("path"); */
module.exports = {
    devServer:{
        host: '0.0.0.0',
       /*  port: 8081, */
        https: {
            key: fs.readFileSync(`${__dirname}/src/assets/localhost-key.pem`),
            cert: fs.readFileSync(`${__dirname}/src/assets/localhost.pem`)
          },
        public: "https://localhost:8080/"
         /* public: "https://172.20.10.2:8080/" */
    }
}