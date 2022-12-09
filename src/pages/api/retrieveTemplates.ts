// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type FilmStrip = {
  title: string;
  cost: string;
  id: string;
  description: string;
  thumbnail: string;
  image: string;
  base64?: string;
};
export default async function handler(
  req: NextApiRequest, //<Product>
  res: NextApiResponse<FilmStrip>
) {
  const response = await axios.get(`http://localhost:4000/get-templates`);

  if (response.status >= 300) {
    throw new Error("Could not retrieve templates!");
  }

  res.status(200).json(response.data);
}
