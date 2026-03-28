import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"

import { awsRegion } from "./region"

let client: S3Client | null = null

function getClient(): S3Client {
  if (!client) {
    client = new S3Client({ region: awsRegion() })
  }
  return client
}

export async function putObjectUtf8(
  bucket: string,
  key: string,
  body: string,
  contentType = "application/json; charset=utf-8",
): Promise<void> {
  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  )
}

export async function getObjectUtf8(
  bucket: string,
  key: string,
): Promise<string | null> {
  try {
    const out = await getClient().send(
      new GetObjectCommand({ Bucket: bucket, Key: key }),
    )
    if (!out.Body) return null
    return await out.Body.transformToString("utf-8")
  } catch {
    return null
  }
}
