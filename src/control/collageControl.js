const CollegeModel = require("../Models/CollegeModel")
const internModel = require('../Models/internModel')

const CreateCollege = async function (req, res) {
    try {
        let data = req.body
        if (!data) return res.status(400).send({ status: false, Msg: "Pls provide data in body" });
        let { name, fullName, logoLink } = data
        if (!name) return res.status(400).send({ status: false, msg: "name is mandatory" });
        if (!fullName) return res.status(400).send({ status: false, msg: "fullName is mandatory" });
        if (!logoLink) return res.status(400).send({ status: false, msg: "logoLink is mandatory" });
        let namePresent = await CollegeModel.findOne({
            name
        })
        if (namePresent) return res.status(400).send({ status: false, msg: "Pls Provide Unique name" });
        let finalcollege = await CollegeModel.create(data)
        return res.status(201).send({ status: true, data: finalcollege })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const getCollagedata=async function(req, res){
    try{
        let collegeName= req.query.collegeName
        if(!collegeName)return res.status(400).send({status:false, msg:"pls Provide college Name"});
        let data=await CollegeModel.findOne({name:collegeName})
        if(!data)return res.status(404).send({status:false,msg:"page not found"})
        let intern=await internModel.find({collegeId:data.id})
        if(intern.length<0)return res.status(404).send("intern not found")
            return res.status(200).send({data,"interns":intern})
        
    }
    catch(error){
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.CreateCollege = CreateCollege
module.exports.getCollagedata=getCollagedata