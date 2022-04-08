var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');


export const sendGrid = (options) => {

  // api key https://sendgrid.com/docs/Classroom/Send/api_keys.html
  // var options = {
  //     auth: {
  //         api_key: process.env.apikey.EMAIL_SERVER_PASSWORD
  //     }
  // }
  
  // or
  
  // username + password
  var options = {
      auth: {
          api_user:  process.env.apikey ,
          api_key: process.env.EMAIL_SERVER_PASSWORD
      }
  }
      
  var mailer = nodemailer.createTransport(sgTransport(options));


  var email = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  mailer.sendMail(email, function(err, res) {
    if (err) { 
        console.log(err) 
    }
    console.log(res);
  });



}


