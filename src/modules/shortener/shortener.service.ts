import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { isURLValid } from "./shortener.utils";

const prisma = new PrismaClient();

export async function shortenUrl(longUrl: string) {
  try {
    const isUrlValid = isURLValid(longUrl);
    if (!isUrlValid) throw new Error("Invalid URL. Please enter a valid URL and try again");

    const urlExists = await prisma.url.findFirst({
      where: {
        long_url: longUrl,
      },
    });

    if (urlExists) return urlExists.short_url;

    const baseURL = process.env.BASE_URL;
    const uniqueId = nanoid(10);
    const shortUrl = `${baseURL}/${uniqueId}`;

    const url = await prisma.url.create({
      data: {
        long_url: longUrl,
        short_url: shortUrl,
        unique_id: uniqueId,
      },
    });

    return {
      message: "URL shortened successfully",
      shortUrl: url.short_url,
    };
  } catch (error) {
    throw error;
  }
}

export async function fetchUrl(urlUniqueId: string) {
  try {
    const url = await prisma.url.findFirst({
      where: {
        unique_id: urlUniqueId,
      },
    });

    return url;
  } catch (error) {
    throw error;
  }
}