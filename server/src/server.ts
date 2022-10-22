import Express from "express";
import { PrismaClient } from "@prisma/client";
import DateUtils from "./utils/date-functions";

/*- Criação do app com base no express -*/
const app = Express();
const prisma = new PrismaClient({
  log: ["query"],
});
app.use(Express.json());

/*- Get ads -*/
app.get("/ads", async (request, response) => {
  const ads = await prisma.ad.findMany();
  return response.status(201).json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: DateUtils.convertMinutesToHourString(ad.hourStart),
        hourEnd: DateUtils.convertMinutesToHourString(ad.hourEnd),
      };
    })
  );
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
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: DateUtils.convertMinutesToHourString(ad.hourStart),
        hourEnd: DateUtils.convertMinutesToHourString(ad.hourEnd)
      };
    })
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
  const body = request.body;

  //TODO -> Finalizar a implementação da inclusão de novos ads no banco
  const ad = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays,
      hourStart: DateUtils.convertHourStringToMinutes(body.hourStart),
      hourEnd: DateUtils.convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.json(ad);
});

/*- Ativa o listener para a porta 3333 -*/
app.listen(3333);
