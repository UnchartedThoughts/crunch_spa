import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export async function loadUpImage(
  req: string //<Product>
) {
  const response = await axios.post(`/api/getImages`, { name: req });

  if (response.status >= 300) {
    throw new Error("Could not retrieve templates!");
  }

  return response?.data;
}

export async function loadupThumbnail(
  req: string //<Product>
) {
  const response = await axios.post(`/api/getThumbnail`, { name: req });

  if (response.status >= 300) {
    throw new Error("Could not retrieve templates!");
  }

  return response?.data;
}
