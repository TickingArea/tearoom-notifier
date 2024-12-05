import { Router as ExpRouter } from "express";
import Controller from "../controller/Controller";

const Router: ExpRouter = ExpRouter();

Router.post('/signin', Controller.signin);
Router.post('/onbushochange', Controller.onBushoChange);
Router.post('/onprefecturechange', Controller.onPrefectureChange);
Router.get('/getdata', Controller.getData);
Router.post('/enableallbushos', Controller.enableAllBushos);
Router.post('/disableallbushos', Controller.disableAllBushos);
Router.post('/enableallprefectures', Controller.enableAllPrefectures);
Router.post('/disableallprefectures', Controller.disableAllPrefectures);
Router.post('/registeruser', Controller.registerUser);
Router.post('/getusers', Controller.getUsers);
Router.post('/deleteuser', Controller.deleteUser);
Router.post('/edituser', Controller.editUser);

export default Router;