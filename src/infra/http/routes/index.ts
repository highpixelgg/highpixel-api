import express from "express";
import { Account } from "./AccountRoutes";
import { Game } from "./GameRoutes";
import { Player } from "./PlayerRoutes";
import { Social } from "./SocialRoutes";

const Router = express.Router();

Router.use('/v1/account', Account);
Router.use('/v1/social', Social);
Router.use('/v1/game', Game);
Router.use('/v1/player', Player);

// Router.get('*', (_, res) => res.status(404).send("<img src='https://media.tenor.com/XWr6vfqH7WEAAAAC/tentando-n%C3%A3o-rir-risada.gif'/> <br><br> Nada que você já não tenha visto, apenas um servidor web."));

export { Router };
