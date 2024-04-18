import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { isURLValid } from "./utils";

const prisma = new PrismaClient();

export async function shortenUrl(longUrl: string) {
  try {
    const isUrlValid = isURLValid(longUrl);
    if (!isUrlValid) throw new Error("Invalid URL. Please enter a valid URL and try again");

    const urlExists = await prisma.url.findFirst({
      where: {
        longUrl,
      },
    });

    if (urlExists) return urlExists.shortUrl;

    const baseURL = process.env.BASE_URL;
    const uniqueId = nanoid(10);
    const shortUrl = `${baseURL}/${uniqueId}`;

    const url = await prisma.url.create({
      data: {
        longUrl,
        shortUrl,
        uniqueId,
      },
    });

    return {
      message: "URL shortened successfully",
      shortUrl: url.shortUrl,
    };
  } catch (error) {
    throw error;
  }
}

export async function fetchUrl(urlUniqueId: string) {
  try {
    const url = await prisma.url.findFirst({
      where: {
        uniqueId: urlUniqueId,
      },
    });

    return url;
  } catch (error) {
    throw error;
  }
}