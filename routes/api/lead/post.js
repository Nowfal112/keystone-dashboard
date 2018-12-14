const keystone = require("keystone");
const LeadEvent = keystone.list("Lead");
const request = require("superagent");
const config = require("../../../config/config.js");

const addTomMailChimpList = req => {
  return request
    .post(
      "https://" +
      config.mailChimp.instance +
      ".api.mailchimp.com/3.0/lists/" +
      config.mailChimp.istUniqueId +
      "/members/"
    )
    .set("Content-Type", "application/json;charset=utf-8")
    .set(
      "Authorization",
      "Basic " + new Buffer("any:" + config.mailChimp.apiKey).toString("base64")
    )
    .send({
      email_address: req.body.email,
      status: "subscribed",
      merge_fields: {
        FNAME: req.body.fullName
      }
    })
    .timeout({
      response: 5000,  // Wait 5 seconds for the server to start sending,
    })
    .then(response => {
      return response;
    });
};


module.exports = async (req, res) => {

  if (!req.body.fullName || !req.body.type || !req.body.email) {
    return res.status(400).json({ message: "incomplete data set" });
  }
  const newLead = new LeadEvent.model();
 
  //Add the new user lead to the db.
  LeadEvent.updateItem(newLead, req.body, function(error) {
    res.locals.enquirySubmitted = true;
    if (error) {
      res.locals.saveError = true;
      res.status(500).json({ message: "Could not add lead, try again later." });
    }

  //Add the new user to the MailChimp Subscription list.
  addTomMailChimpList(req)
  .then(response => {
    if ( response.status < 300 ) {
      res.status(200).json({ message: "Lead Added" });
    }
  })
  .catch(e => {
    if (e.status == 400 && e.response.body.title === "Member Exists") {
      res.status(200).json({ message: "Lead Added, Member alreay subscribed" });
    } 
    else {
      res.status(200).json({ message: "Could not add to mailing list. Try again later" });
    }
  });
  });
};
