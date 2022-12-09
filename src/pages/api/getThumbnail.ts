// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Images = {
  image: string;
};
export default async function handler(
  req: NextApiRequest, //<Product>
  res: NextApiResponse<Images>
) {
  const response = await axios.post(
    `http://localhost:4000/get-thumbnails`,
    req.body
  );

  if (response.status >= 300) {
    throw new Error("Could not retrieve templates!");
  }

  res.status(200).json({ image: response.data });
}
