const { Redisclient } = require("../redis_config");

function RateLimitter({ secondsWindow, allowedHits }) {
  return async function (req, res, next) {
    // the req.headers["x-forwarded-for"] is if i have an nginx server in order to get the ip
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    console.log(ip);
    //console.log(req.connection);

    const requests = await Redisclient.incr(ip);

    //time remaining is the ttl
    let ttl;
    if (requests === 1) {
      await Redisclient.expire(ip, secondsWindow);
      ttl = secondsWindow;
    } else {
      ttl = await Redisclient.ttl(ip);
    }
    // it don really need the ttl
    console.log("ttl:   ", ttl);
    console.log("Number of requests... ", requests);
    // i can verify that is working fine

    // based on this example i permite 20 requets per 60 seconds that i have specified in the expire part
    if (requests > secondsWindow) {
      return res.status(200).json({
        response: "error",
        callsInMinute: requests,
      });
    } else {
      next();
    }
  };
}

module.exports = RateLimitter;
