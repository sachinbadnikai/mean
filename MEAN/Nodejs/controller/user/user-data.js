const { userDetails, validateuserDetails } = require('../../models/user/user-data');


exports.userDetailGetAll = async (req, res) => {
    const userDetail = await userDetails.find();
    res.send(userDetail);
}

exports.userDetailGetByUserId = async (req, res) => {
    const userDetail = await userDetails.find({user_id:req.params.user_id});
    res.send(userDetail);
}

exports.userDetailGetById = async (req, res) => {
    const userDetail = await userDetails.findById(req.params.id);
    res.send(userDetail);
}

exports.userDetailPost = async (req, res) => {
    const { error } = validateuserDetails(req.body.user);
    if (error) return res.status(400).send(error.details[0].message);
    if (error) return res.status(400).send(error.Language[1].message);

    let userDetail = new userDetails({
        name: req.body.user.name,
        email: req.body.user.email,
        url: req.body.user.url,
        mobile_no:req.body.user.mobile_no,
        gender:req.body.user.gender,
        description:req.body.user.description,
        date: req.body.user.date,
        time: req.body.user.time,
        user_id:req.body.user_id
      });

        user = await userDetail.save().then().catch(function (err) {
             res.status(400).send(err.message);  
        });
       
        return res.send(user);
}

exports.userDetailUpdate = async (req, res) => {
    const { error } = validateuserDetails(req.body);

    if (error) return res.status(400).send(error.details[0].message);
   
    const userDetail = await userDetails.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        url: req.body.url,
        mobile_no:req.body.mobile_no,
        gender:req.body.gender,
        description:req.body.description,
        date: req.body.date,

    },
    { runValidators: true, context: 'query' },
    function (err) {
       
    },
   
        {
            new: true
        }, 
       
       ).then().catch(function (err) {
         res.status(400).send(err.message); 
    });
    res.send(userDetail);
}

exports.userDetailDelete = async (req, res) => {
    const userDetail = await userDetails.findByIdAndRemove(req.params.id);
    res.send(userDetail);
}     