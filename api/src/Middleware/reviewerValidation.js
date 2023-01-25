const reviewerValidation = (req, res, next) => {
  try {
    const userType = req.user.user_type;

    if (userType == 0) {
      next();
    } else {
      res
        .status(403)
        .send({
          error: "Your account doesn't have the necesary user permissions",
        });
    }
  } catch (e) {
    res.status(500).send({ error: "UserType error" });
  }
};

module.exports = reviewerValidation;
