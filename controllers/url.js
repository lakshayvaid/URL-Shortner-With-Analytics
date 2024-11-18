const Url = require('../models/url');
const shortid = require('shortid');


//function to create short id and get redirect_url from user and updating in the database

async function handleposturl(req, res) {

    const body = req.body;

    if (!body.url) return res.status(400).json({ error: "body must pass a url" });
    console.log(body);
     
    
    const shortID = shortid();

    await Url.create({
        shortId: shortID,
        redirect_url: body.url,

    });

    
    const allurls=await Url.find({});

    // res.json({ msg: "redirect_url added", id: shortID });
   return  res.render('home',{
       urls: allurls,id:shortID,
    })

}


//function to redirect to link from the short id 
//http://localhost:8001/url/shortid/:shortid
async function handlegetfromshortid(req, res) {

    const gotshortid = await req.params.shortid;

    const entry = await Url.findOneAndUpdate(
        { shortId: gotshortid },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );

     return res.redirect(entry.redirect_url);
    
}

//function to handle analytics url to show how many clicks have done on the given short id 

async function handlegetanalytics(req, res) {
    const gotshortid = req.params.shortid;
    const result = await Url.findOne({
        shortId: gotshortid,
    })
    return res.json({
        totalclick: result.visitHistory.length,
        analytics: result.visitHistory
    });


}

module.exports = {
    handleposturl,
    handlegetfromshortid,
    handlegetanalytics,

}