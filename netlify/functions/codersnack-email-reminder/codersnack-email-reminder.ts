import { Handler } from '@netlify/functions'
import sgMail from '@sendgrid/mail'
import { fetchRandomCodersnackByCategory } from './lib/data.services';
import { CoderSnack, CoderSnackResponse } from './lib/domain/types';

sgMail.setApiKey(process.env.EMAIL_API_KEY as any);

export const handler: Handler = async (event, context) => {
  const { category = 'reactjs' } = event.queryStringParameters

  const response: CoderSnackResponse = await fetchRandomCodersnackByCategory(category);

  const snack: CoderSnack = response.snack;
  const categoryData = response.category;

  const subject = `${snack.header} [Codersnack Daily Reminder]`
  const name = 'Codersnack Snipper Reminder - daily CRON'

  const msg = {
    to: 'javier.escacena@gmail.com',
    from: 'admin-clean-snippets@jesidea.com',
    templateId: 'd-6aa2e700836b47c6bde1f731b71cfc0f',
    dynamicTemplateData: {
      subject: subject,
      name: name,
      "snack-id": `${snack.id}`,
      "title": `${snack.header}`,
      "url": `${snack.url}`,
      "category": `${categoryData.header}`,
      "category-key": `${categoryData.key}`
    },
  };

  let jsonResponse;
  try {
    await sgMail.send(msg);
    jsonResponse = {
      statusCode: 200,
      body: JSON.stringify(Object.assign(msg, { message: `Email has been sent` }))
    }
  } catch (error) {

    jsonResponse = {
      statusCode: 500,
      body: JSON.stringify({ error: `Error sending email ${error} - ${process.env.EMAIL_API_KEY}` })
    }
  }

  return jsonResponse;

}
