import fs from "node:fs";
import express from "express";
import { PrismaClient } from "@prisma/client";
import escapeHTML from "escape-html";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
const prisma = new PrismaClient();

const template = fs.readFileSync("./template.html", "utf-8");

app.get("/", async (request, response) => {
  try {
    const posts = await prisma.post.findMany();

    // JSON形式でデータをクライアントに返す
    response.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/send", async (request, response) => {
  try {
    await prisma.post.create({
      data: { message: request.body.message },
    });
    response.redirect("/");
  } catch (error) {
    console.error("Error creating post:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
