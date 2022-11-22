const express = require('express');
const router = express.Router();

//////////////////////////~Import folder~////////////////////////
const intern=require('../control/interncontrol')
const collage=require('../control/collageControl')

/////////////////////////~Router besed Api~//////////////////////
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post('/functionup/colleges',collage.CreateCollege)

router.post('/functionup/interns',intern.createIntern)

router.get('/functionup/collegeDetails',collage.getCollagedata)

/////////////////////////~exports Modules~/////////////////////////////
module.exports = router;