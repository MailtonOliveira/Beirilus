import { SUCCESS } from './../constants/success';
import { ERRORS } from './../constants/errors';
import nodemailer from 'nodemailer';
import prisma from "../database/prismaClient";




class MailService {

   async SendMail(to: string, text: string, subject: string) {
      try {
        const configMail = await prisma.config.findFirstOrThrow();
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: configMail.mail_username,
            pass: configMail.mail_passwd
          }
        });
        
        const mailOptions = {
          from: configMail.mail_username,
          to,
          subject,
          html: text,
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            return {status:"error", msg: ERRORS.EMPLOYEE.ID};
          } else {
            return {status:"success", msg: SUCCESS.APP.SERVEROK};
          
          }
        });
      
      } catch (error) {
        return {status:"error", msg: ERRORS.EMPLOYEE.ID};
        
      }
    } 
}

export default new MailService();