/* eslint-disable max-len */
/* eslint-disable no-console */
import nodeMailer from 'nodemailer';
import db from './db';

function send(data) {
  const transporter = nodeMailer.createTransport(process.env.SMTP_SERVER_URL);
  const mailOptions = {
    from: 'ALJ_JP_SM_Automation_Idea_Logger@axa.co.jp', // sender address
    to: data.to,
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return ('index');
  });
}


function sendEmailConfirmation(id, type, edit) {
  // eslint-disable-next-line no-undef
  db.query('SELECT * FROM suggestion WHERE id = ?', [id], (error, results) => {
    // console.log('The solution is: ', results);
    let emailData;
    // eslint-disable-next-line no-lonely-if
    if (results.length > 0) {
      if (type === 'post') {
        emailData = {
          to: results[0].contributorEmail,
          subject: 'Suggestion received / 提案が受け取られる',
          text: 'Your suggestion has been received. Thank you very much! あなたの提案は正しく受け取られました。ありがとうございました。',
          html: 'Hello,<br><br>Your suggestion has been received.<br>Thank you very much!<br><br>あなたの提案は正しく受け取られました。<br>ありがとうございました。<br><br>Regards',
        };
        send(emailData);
      } if (type === 'put') {
        let text = 'Hello, ';
        let html = 'Hello,<br>';

        const count = Object.keys(edit).length;
        for (let i = 0; i < count; i++) {
          text += `The"${Object.keys(edit)[i]}" of your suggestion is now "${edit[Object.keys(edit)[i]].now}" instead of "${edit[Object.keys(edit)[i]].past}".`;
          html += '<br>';
          html += `The <b>${Object.keys(edit)[i]}</b> of your suggestion is now <b>${edit[Object.keys(edit)[i]].now}</b> instead of <b>${edit[Object.keys(edit)[i]].past}</b>.`;
        }
        for (let i = 0; i < count; i++) {
          text += `あなたの提案の"${Object.keys(edit)[i]}"は"${edit[Object.keys(edit)[i]].now}"ではなく"${edit[Object.keys(edit)[i]].past}"になりました。.`;
          html += '<br>';
          html += `あなたの提案の<b>${Object.keys(edit)[i]}</b>は<b>${edit[Object.keys(edit)[i]].now}</b>ではなく<b>${edit[Object.keys(edit)[i]].past}</b>になりました。.`;
        }
        html += '<br><br>Regards';
        emailData = {
          to: results[0].contributorEmail,
          subject: 'Suggestion updated / 提案が更新されました',
          text,
          html,
        };
        send(emailData);
      }
    }
  });
}

export default sendEmailConfirmation;
