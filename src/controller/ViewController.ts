import { Request, Response } from "express";
import MediaType from "../enums/MediaType";
import fs from 'fs';
import path from 'path';

export default class ViewController {
    private static getMediaType(filename: string): MediaType {
        if (filename.endsWith('.html')) {
            return MediaType.TEXT_HTML;
        } else if (filename.endsWith('.css')) {
            return MediaType.TEXT_CSS;
        } else if (filename.endsWith('.js')) {
            return MediaType.TEXT_JS;
        }

        return MediaType.APPLICATION_OCTET_STREAM;
    }
 
    public static async main(req: Request, res: Response): Promise<void> {
        let req_path: string = req.baseUrl;
        const splitted: string[] = req_path.split('/');
        const splittedPath: string | null = splitted.length >= 1 ? splitted[splitted.length - 1] : null;

        if (!req_path.replace('/', '').trim()) {
            req_path = '/index.html';
        } else if (splittedPath && !splittedPath.includes('.')) {
            req_path = '/index.html';
        }

        const filePath: string = path.join(__dirname, '..', '..', 'frontend', 'tearoom-dashboard', 'build', req_path);

        try {
            const content = fs.readFileSync(filePath);
            res.set('Content-Type', ViewController.getMediaType(req_path)).send(content);
        } catch (e) {
            res.status(404).end();
        }
    }
};