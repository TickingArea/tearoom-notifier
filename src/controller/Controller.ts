import { Request, Response } from "express";
import NotifyUser, { INotifyUser } from "../model/NotifyUser";
import TeaSpotBusho from "../enums/TeaSpotBusho";
import Prefectures from "../enums/Prefectures";
import Permissions from "../enums/Permissions";

export default class Controller {
    private static async checkModeratorOrHigher(user: INotifyUser): Promise<boolean> {
        if (user.permission !== Permissions.USER) return true;

        return false;
    }

    private static async isHigherPermission(userPerm: Permissions, guestPerm: Permissions): Promise<boolean> {
        const permissionsOrder = [
            Permissions.OWNER,
            Permissions.ADMIN,
            Permissions.MODERATOR,
            Permissions.USER
        ];

        const index1 = permissionsOrder.indexOf(userPerm);
        const index2 = permissionsOrder.indexOf(guestPerm);

        if (index1 === index2) {
            return false;
        }

        return index1 !== -1 && index2 !== -1 && index1 < index2;
    }

    private static async isLowerPermission(userPerm: Permissions, guestPerm: Permissions): Promise<boolean> {
        const permissionsOrder = [Permissions.OWNER, Permissions.ADMIN, Permissions.MODERATOR, Permissions.USER];

        const userPermIndex = permissionsOrder.indexOf(userPerm);
        const guestPermIndex = permissionsOrder.indexOf(guestPerm);

        if (userPermIndex === -1 || guestPermIndex === -1) {
            throw new Error('Invalid permissions provided');
        }

        return userPermIndex < guestPermIndex;
    }

    // /api/v1/signin (post)
    public static async signin(req: Request, res: Response): Promise<void> {
        // email only
        const email = req.body.email;

        const notifyUsers = await NotifyUser.find();
        for (const user of notifyUsers) {
            if (email === user.email) {
                res.status(200).end();
                return;
            }
        }

        res.status(401).end();
    }

    // /api/v1/onbushochange (post)
    public static async onBushoChange(req: Request, res: Response): Promise<void> {
        const value: TeaSpotBusho = req.body.value;
        const globalEmail: string = req.body.email;

        const notifyUsers = await NotifyUser.find();
        for (const user of notifyUsers) {
            if (user.email === globalEmail) {
                if (user.notifyBushos.includes(value)) {
                    user.notifyBushos = user.notifyBushos.filter(item => item !== value);
                } else {
                    user.notifyBushos.push(value);
                }
                await user.save();
                res.status(200).end();
                return;
            }
        }

        res.status(400).end();
    }

    // /api/v1/onprefecturechange (post)
    public static async onPrefectureChange(req: Request, res: Response): Promise<void> {
        const value: Prefectures = req.body.value;
        const globalEmail: string = req.body.email;

        const notifyUsers = await NotifyUser.find();
        for (const user of notifyUsers) {
            if (user.email === globalEmail) {
                if (user.notifyPrefectures.includes(value)) {
                    user.notifyPrefectures = user.notifyPrefectures.filter(item => item !== value);
                } else {
                    user.notifyPrefectures.push(value);
                }
                await user.save();
                res.status(200).end();
                return;
            }
        }

        res.status(400).end();
    }

    // /api/v1/getdata (get)
    public static async getData(req: Request, res: Response): Promise<void> {
        const email = req.query.email;

        if (email) {
            const notifyUsers = await NotifyUser.find();
            for (const user of notifyUsers) {
                if (user.email === email) {
                    res.status(200).json(user);
                    return;
                }
            }
        }

        res.status(404).end();
    }

    // /api/v1/enableallbushos (post)
    public static async enableAllBushos(req: Request, res: Response): Promise<void> {
        const email = req.body.email;

        if (email) {
            const notifyUsers = await NotifyUser.find();
            for (const user of notifyUsers) {
                if (user.email === email) {
                    user.notifyBushos = [];
                    Object.values(TeaSpotBusho).map(busho => {
                        user.notifyBushos.push(busho);
                    })
                    await user.save();
                    res.status(200).end();
                    return;
                }
            }
        }

        res.status(400).end();
    }

    // /api/v1/disableallbushos (post)
    public static async disableAllBushos(req: Request, res: Response): Promise<void> {
        const email = req.body.email;

        if (email) {
            const notifyUsers = await NotifyUser.find();
            for (const user of notifyUsers) {
                if (user.email === email) {
                    user.notifyBushos = [];
                    await user.save();
                    res.status(200).end();
                    return;
                }
            }
        }

        res.status(400).end();
    }

    // /api/v1/enableallprefectures (post)
    public static async enableAllPrefectures(req: Request, res: Response): Promise<void> {
        const email = req.body.email;

        if (email) {
            const notifyUsers = await NotifyUser.find();
            for (const user of notifyUsers) {
                if (user.email === email) {
                    user.notifyPrefectures = [];
                    Object.values(Prefectures).map(prefecture => {
                        user.notifyPrefectures.push(prefecture);
                    })
                    await user.save();
                    res.status(200).end();
                    return;
                }
            }
        }

        res.status(400).end();
    }

    // /api/v1/disableallprefectures (post)
    public static async disableAllPrefectures(req: Request, res: Response): Promise<void> {
        const email = req.body.email;

        if (email) {
            const notifyUsers = await NotifyUser.find();
            for (const user of notifyUsers) {
                if (user.email === email) {
                    user.notifyPrefectures = [];
                    await user.save();
                    res.status(200).end();
                    return;
                }
            }
        }

        res.status(400).end();
    }

    // /api/v1/registeruser (post)
    public static async registerUser(req: Request, res: Response): Promise<void> {
        const email = req.body.email;
        const registrationEmail = req.body.registrationEmail;
        const registrationPermission = req.body.registrationPermission;

        if (email) {
            const notifyUsers = await NotifyUser.find();

            let prevent: boolean = false;
            notifyUsers.forEach(user => {
                if (registrationEmail === user.email) {
                    prevent = true;
                    return;
                }
            })

            if (prevent) {
                res.status(400).end(); // already exists
                return;
            }

            for (const user of notifyUsers) {
                if (user.email === email) {
                    if (await Controller.checkModeratorOrHigher(user) && await Controller.isLowerPermission(user.permission, registrationPermission)) {
                        const newUser = new NotifyUser({ email: registrationEmail, permission: registrationPermission, notifyBushos: [], notifyPrefectures: [] });
                        await newUser.save();
                        res.status(200).end();
                        return;
                    }
                }
            }
        }

        res.status(500).end();
    }

    // /api/v1/getusers (post)
    public static async getUsers(req: Request, res: Response): Promise<void> {
        const email = req.body.email;

        if (email) {
            const notifyUsers = await NotifyUser.find();
            for (const user of notifyUsers) {
                if (user.email === email) {
                    if (await Controller.checkModeratorOrHigher(user)) {
                        res.status(200).json(notifyUsers);
                        return;
                    }
                }
            }
        }

        res.status(404).end();
    }

    // /api/v1/deleteuser (post)
    public static async deleteUser(req: Request, res: Response): Promise<void> {
        const email = req.body.email;
        const userIndex = req.body.userIndex;

        if (email) {
            const notifyUsers = await NotifyUser.find();
            for (const user of notifyUsers) {
                if (user.email === email) {
                    if (await Controller.checkModeratorOrHigher(user) && await Controller.isHigherPermission(user.permission, notifyUsers[userIndex].permission)) {
                        const result = await notifyUsers[userIndex].deleteOne();
                        if (result.deletedCount === 1) {
                            res.status(200).end();
                            return;
                        }
                    } else {
                        res.status(400).send('You do not have permission to do this.').end();
                        return;
                    }
                }
            }
        }

        res.status(404).end();
    }

    // /api/v1/edituser (post)
    public static async editUser(req: Request, res: Response): Promise<void> {
        const email = req.body.email;
        const userEmail = req.body.userEmail;
        const userPermission = req.body.userPermission;

        if (email) {
            const notifyUsers = await NotifyUser.find();
            for (const user of notifyUsers) {
                if (user.email === email) {
                    if (await Controller.checkModeratorOrHigher(user)) {
                        for (const editUser of notifyUsers) {
                            if (editUser.email === userEmail) {
                                if (await Controller.isHigherPermission(user.permission, editUser.permission) && await Controller.isLowerPermission(user.permission, userPermission)) {
                                    editUser.permission = userPermission;
                                    await editUser.save();
                                    res.status(200).end();
                                    return;
                                } else {
                                    res.status(400).send('You do not have permission to do this.').end();
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        }
        res.status(404).end();
    }
};