import * as Handlebars from "handlebars";
import * as fs from "fs";
import * as nodemailer from "nodemailer";
// import { MAIL_USERNAME, MAIL_PASSWORD } from "@environment";
import { MAIL_USERNAME, MAIL_PASSWORD, ADDRESS } from "../environment";

export const sendMail = ({ to, username, code }) => {
  try {
    const transporter = nodemailer.createTransport(
      {
        host: "smtp.gmail.com",
        port: 465,
        logger: false,
        auth: {
          user: MAIL_USERNAME,
          pass: MAIL_PASSWORD
        }
      },
      {
        from: "goTeam <vanyteam123@gmail.com>"
      }
    );

    const message = (html) => {
      return {
        to: `<${to}>`,
        subject: "Password",
        text: `Hi ${username},`,
        html
      };
    };

    const readHTMLFile = (path, callback) => {
      fs.readFile(path, { encoding: "utf-8" }, (err, html) => {
        if (err) {
          callback(err);
        } else {
          callback(err, html);
        }
      });
    };

    readHTMLFile("./src/assets/verify-email.html", (err, source) => {
      const template = Handlebars.compile(source);
      const html = template({
        code,
        address: ADDRESS
      });
      const mailOption = message(html);
      transporter.sendMail(mailOption, (error, info) => {
        console.log("helllo");

        if (error) throw error;
        console.log("Message sent successfully!");
        console.log(nodemailer.getTestMessageUrl(info));
        transporter.close();
        return true;
      });
    });
  } catch (err) {
    console.log(err);
    return new Error(err);
    // throw new err();
  }
};

// sendMail({
//   to: "levanyy2@gmail.com",
//   username: "levany",
//   code: 567891
// });
