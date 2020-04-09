const http = require('http');
const app = require('./app');
http.createServer(app).listen(4000, () => console.log(`Running a GraphQL API server at http://localhost:4000/graphql`));

