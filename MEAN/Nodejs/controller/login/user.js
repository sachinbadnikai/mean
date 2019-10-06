const bcrypt = require('bcrypt');
const { users } = require('../../models/signUp/user');
const { designation } = require('../../models/admin/designation')

exports.userAuthPost = async (req, res) => {
  let user = await users.findOne({ email: req.body.email }).populate('designation')
  if (!user) return res.status(400).send("Incorrect Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send("Incorrect Email or Password");

  let roles = await designation.findById(user.designation)
  const token = user.generateAuthToken();
  const role = roles.designation
  res.send({token});
}


