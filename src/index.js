const app = require("./app");
// kano import to redis client
const { Redisclient } = require("./redis_config");

const port = 3000;

app.listen(port, async () => {
  await Redisclient.connect();

  console.log(`App is running at http://localhost:${port}`);
});
