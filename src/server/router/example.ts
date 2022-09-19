import { createRouter } from "./context";
import { z } from "zod";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { env } from "../../env/server.mjs";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("listImages", {
    async resolve() {
      const client = new S3Client({
        region: "ap-southeast-1",
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY,
          secretAccessKey: env.AWS_SECRET_KEY,
        },
      });

      const command = new ListObjectsV2Command({
        Bucket: env.AWS_BUCKET_ID,
        Prefix: "buddyImages",
      });

      try {
        const results = await client.send(command);
        if (!results.Contents) return [];

        return results.Contents.filter(
          (content) => !!content.Key && content.Key.includes(".")
        ).map(
          (content) => `https://fgacyc-ywkl.s3.amazonaws.com/${content.Key}`
        );
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });
