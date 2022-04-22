import { Handler } from '@netlify/functions'
import sgMail from '@sendgrid/mail'
import { fetchCodersnackTest, fetchRandomCodersnackByCategory } from '../codersnack-email-reminder/lib/data.services'
// require('./data.services.ts')

sgMail.setApiKey(process.env.EMAIL_API_KEY as any);


export const handler: Handler = async (event, context) => {
  // const { name = 'stranger' } = event.queryStringParameters


  const response = await fetchRandomCodersnackByCategory();

  const subject = 'KK de la VAKA SUBJECT'
  const name = 'Bruto Mecanico'
  const message = 'El patio de mi casa es particular'
  const msg = {
    to: 'javier.escacena@gmail.com',
    from: 'admin-clean-snippets@jesidea.com',
    subject,
    name,
    text: JSON.stringify(response),
  };

  let jsonResponse;
  try {
    await sgMail.send(msg);
    jsonResponse = {
      statusCode: 200,
      body: JSON.stringify({ message: `Email has been sent` })
    }
  } catch (error) {

    jsonResponse = {
      statusCode: 500,
      body: JSON.stringify({ error: `Error sending email ${error} - ${process.env.EMAIL_API_KEY}` })
    }
  }

  return jsonResponse;

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(response)
  //   // body: JSON.stringify({
  //   //   message: `Hello, ${name}!`,
  //   // }),
  // }
}
