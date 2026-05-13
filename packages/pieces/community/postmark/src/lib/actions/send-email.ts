import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const sendEmail = createAction({
  name: 'send_email',
  displayName: 'Send Email',
  description: 'Send a single email through Postmark',
  props: {
    from: Property.ShortText({
      displayName: 'From',
      required: true,
    }),
    to: Property.ShortText({
      displayName: 'To',
      required: true,
    }),
    subject: Property.ShortText({
      displayName: 'Subject',
      required: true,
    }),
    htmlBody: Property.ShortText({
      displayName: 'HTML Body',
      required: false,
    }),
    textBody: Property.ShortText({
      displayName: 'Text Body',
      required: false,
    }),
  },
  async run(context) {
    const { from, to, subject, htmlBody, textBody } = context.propsValue;
    const response = await httpClient.sendRequest({
      method: HttpMethod.POST,
      url: 'https://api.postmarkapp.com/email',
      headers: {
        'X-Postmark-Server-Token': context.auth,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: {
        From: from,
        To: to,
        Subject: subject,
        HtmlBody: htmlBody,
        TextBody: textBody,
      },
    });
    return response.body;
  },
});
