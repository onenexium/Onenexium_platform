import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2"

import { awsRegion } from "./region"

let client: SESv2Client | null = null

function getClient(): SESv2Client {
  if (!client) {
    client = new SESv2Client({ region: awsRegion() })
  }
  return client
}

export type SendSimpleEmailInput = {
  from: string
  to: string[]
  subject: string
  textBody: string
  htmlBody?: string
  configurationSetName?: string
}

/**
 * Send a simple transactional email via Amazon SES v2.
 */
export async function sendSimpleEmail(input: SendSimpleEmailInput): Promise<void> {
  const { from, to, subject, textBody, htmlBody, configurationSetName } = input

  await getClient().send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Destination: { ToAddresses: to },
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: textBody, Charset: "UTF-8" },
            ...(htmlBody
              ? { Html: { Data: htmlBody, Charset: "UTF-8" } }
              : {}),
          },
        },
      },
      ...(configurationSetName
        ? { ConfigurationSetName: configurationSetName }
        : {}),
    }),
  )
}
