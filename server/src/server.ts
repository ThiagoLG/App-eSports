import Express, { request, response } from "express";
import { PrismaClient } from "@prisma/client";

/*- Criação do app com base no express -*/
const app = Express();
const prisma = new PrismaClient({
  log: ["query"],
});
app.use(Express.json());

/*- Get ads -*/
app.get("/ads", (request, response) => {
  return response.status(201).json([]);
});

/*- Get games -*/
app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return response.json(games);
});

/*- Get Ads by game-*/
app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourEnd: true,
      hourStart: true,
    },
    where: {
      gameId: gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.json(
    ads.map((ad) => ({ ...ad, weekDays: ad.weekDays.split(",") }))
  );
});

/*- Get discord by ad -*/
app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adId,
    },
    select: {
      discord: true,
    },
  });

  return response.json({ discord: ad.discord });
});

/*- Creat new Ad -*/
app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  //TODO -> Finalizar a implementação da inclusão de novos ads no banco

  return response.json(request.body);
});

/*- Ativa o listener para a porta 3333 -*/
app.listen(3333);
