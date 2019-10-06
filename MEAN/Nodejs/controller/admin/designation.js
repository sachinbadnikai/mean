const { designation, validateDesignation } = require('../../models/admin/designation');

exports.designationGetAll = async (req, res) => {
        const designations = await designation.find();
        res.send(designations);
      }

exports.designationPost = async (req, res) => {
    const { error } = validateDesignation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let designations = new designation({
        designation:req.body.designation,
        status:req.body.status,
    });

    postDesignation = await designations.save().then().catch(function (err) {
             res.status(400).send(err.message);  
        });
   return res.send(postDesignation);
}

exports.designationUpdate = async (req, res) => {
    const { error } = validateDesignation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const designations = await designation.findByIdAndUpdate(req.params.id, {
        designation:req.body.designation,
        status:req.body.status,

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
    res.send(designations);
}

exports.designationDelete = async (req, res) => {
    const designations = await designation.findByIdAndRemove(req.params.id);
    res.send(designations);
}     