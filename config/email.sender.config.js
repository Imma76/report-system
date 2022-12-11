import nodemailer from 'nodemailer';
import google from 'googleapis';


class Config{
    async createTransporter() {
        const OAuth2 = google.Auth.OAuth2Client;
        const oauth2Client = new OAuth2(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET,
          "https://developers.google.com/oauthplayground"
        );
      
        oauth2Client.setCredentials({
          refresh_token: process.env.REFRESH_TOKEN
        });
      
        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                console.log(`${   process.env.CLIENT_ID},
                   ${ process.env.REFRESH_TOKEN}`);
              if (err) {
                  console.log(err);
              reject();
            }
            resolve(token);
          });
        });
        console.log(accessToken);
      
        const transporter = nodemailer.createTransport({
          service: "gmail",

          secure: true,
          auth: {
            type: "OAuth2",
              user: process.env.EMAIL,
            pass:process.env.pass,
             acccesToken:accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
          },tls: {
            rejectUnauthorized: false
        }
        });
       
      
        return transporter;
      };
}

export default new Config();