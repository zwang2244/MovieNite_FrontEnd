module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123456") {
      console.log("???");
      return res.status(200).json({
        user: {
          token: "123", // jwt
        },
      });
    } else {
      return res.status(400).json({ message: "那里错了!!" });
    }
  }
};
