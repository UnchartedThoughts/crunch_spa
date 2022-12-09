import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

interface FilmStrip {
  title: string;
  cost: string;
  id: string;
  description: string;
  thumbnail: string;
  image: string;
  base64?: string;
}

export async function loadUpTemplates(): Promise<FilmStrip[]> {
  const response = await axios.get(`/api/retrieveTemplates`);

  if (response.status >= 300) {
    throw new Error("Could not retrieve templates!");
  }

  return response?.data;
}
