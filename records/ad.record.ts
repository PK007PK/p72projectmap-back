import { FieldPacket } from "mysql2";
import { AdEntity } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";

interface NewAddEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;

    constructor (obj: NewAddEntity) {
        if (!obj.name || obj.name === "" || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków')
        }

        if (!obj.description || obj.description === "" || obj.description.length > 1024) {
            throw new ValidationError('Treść ogłoszenia nie może być pusta, ani przekraczać 1024 znaków')
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 ani większa niż 9 999 999')
        }

        //@TODO check if url is valid!
        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Adres ogłoszenia nie może być pusty, ani przekraczać 100 znaków')
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0]);
    }
}