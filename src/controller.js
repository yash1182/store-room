const router = require("express").Router();
const authHandler = require("auth-handler");
const Citizen = require("./models/Citizen");

router.get("/version", (req, res) => {
  res.json({
    author: "Yash Gupta",
    version: "0.0.1",
    serviceName: "store-room",
    success: true,
  });
});

router.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

router.post("/", async (req, res) => {
  const requiredFields = ["firstName", "username", "lastName", "age"];
  for (var field of requiredFields) {
    if (!Object.keys(req.body).includes(field)) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter: " + field,
      });
    }
  }

  const user = await Citizen.findOne({
    username: req.body.username,
  });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "user already exist with username: " + req.body.username,
    });
  }
  const response = await Citizen.create(req.body);
  console.log(response);
  res.json({
    success: true,
  });
});

router.use(authHandler.useVerifyToken());

router.get("/:id", async (req, res) => {
  var userId = req.params.id;
  var user;
  try {
    user = await Citizen.findById(userId);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "user not found with userId: " + userId,
    });
  }
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "user not found with userId: " + userId,
    });
  }
  return res.json({
    success: true,
    data: user,
  });
});

module.exports = router;
