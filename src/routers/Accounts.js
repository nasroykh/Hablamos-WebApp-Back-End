const express = require('express')
const { signUp, uploadProfilePicture } = require('../background-functions/Sign-up')
const { logIn } = require('../background-functions/Log-in')
const multer  = require('multer')
const upload = multer({dest: 'images', storage: multer.memoryStorage()});

const router = new express.Router()


// Status: 'Success', Reason: '.......', Details: '.....', Message: '......'
// Status: 'Failure', Reason: '.......', Details: '.....', Message: '......'
// Status: 'Error', Reason: '.......', Details: '.....', Message: '......'



router.post('/SignUp', upload.single('profilePicture'), async function (req, res) {


//  We store returned values from the login function
    const { status, reason, details, message } = await signUp( req.body.profile, req.body.account );
    
//  We send those values to the client IF their is not error throwen during the logIn() process
    res.send({ 
        Status: status, 
        Reason: reason, 
        Details: details, 
        Message: message
    });

})

router.post('/uploadProfilePicture', upload.single('profilePicture'), async function (req, res) {
    console.log(req.file);
    console.log(req.body.profileID);
//  We store returned values from the login function
    const { status, reason, details, message } = await uploadProfilePicture(req.body.profileID, req.file.buffer);
    
//  We send those values to the client IF their is not error throwen during the logIn() process
    res.send({ 
        Status: status, 
        Reason: reason, 
        Details: details, 
        Message: message
    });

})


router.post('/LogIn', async function (req, res) {
//  We store returned values from the login function
    const { status, reason, details, message } = await logIn( req.body.account.email, req.body.account.password, req.body.account.mySocketID )
    
//  We send those values to the client IF their is not error throwen during the logIn() process
    res.send({ 
        Status: status, 
        Reason: reason, 
        Details: details, 
        Message: message
    });
    
});



module.exports = router;
