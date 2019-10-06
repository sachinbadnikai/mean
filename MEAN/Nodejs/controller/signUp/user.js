const { users, validateUser } = require('../../models/signUp/user');
const bcrypt = require('bcrypt');


exports.userPost = async (req, res) => {

    const { password, email, confirm } = req.body;

    if (!password || !email) return res.status(422).send({ error: [{ title: 'Form was Blank', details: 'Provide User Name and Password' }] });

    if (password !== confirm) return res.status(422).send({ errors: [{ title: 'Invalid Password', details: "Password doesn't Match" }] });

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await users.findOne({ email })
    if (user) return res.status(400).send("email already Registred with us");

    user = new users({
        first_Name: req.body.first_Name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        designation: req.body.designation
      });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('Authorization', token);
    res.status(200).send({ token });
}



