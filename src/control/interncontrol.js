const internModel = require('../Models/internModel')
const collegeModel = require('../Models/CollegeModel')
let emailvalid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
let namevalid = /^[a-zA-Z]{1,20}$/


const createIntern = async function (req, res) {
    try {
        let interndata = req.body
        if (!interndata) return res.status(400).send({ status: false, msg: "pls provide data in body" });
        let { name, email, mobile, collegeName } = interndata
        console.log(collegeName)
        if (!name) return res.status(400).send({ status: false, msg: "name is mandatory part" });
        name = name.trim()
        if (!name.match(namevalid)) return res.status(400).send({ status: false, msg: "Pls provide valid name" })
        if (!email) return res.status(400).send({ status: false, msg: "email is mandatory part" });
        email = email.trim()
        if (!email.match(emailvalid)) return res.status(400).send({ status: false, msg: "Pls provide valid email" })
        if (!mobile) return res.status(400).send({ status: false, msg: "mobile No is mandatory part" });
        let emailPresent = await internModel.findOne({email})
        if (emailPresent) return res.status(400).send({ status: false, msg: "Pls Provide unique email" });
        let mobileNumbler = await internModel.findOne({mobile})
        if (mobileNumbler) return res.status(400).send({ status: false, msg: "Pls provide unique mobile number" });
        if (!collegeName) return res.status(400).send({ status: false, msg: "collegeName is mandatory part" });
        let collegeId = await collegeModel.findOne({name:collegeName})
        const data = {
            name, email, mobile, collegeId: collegeId
        }
        let interncreate = await internModel.create(data)
        return res.status(201).send({ status: true, data: interncreate })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createIntern = createIntern