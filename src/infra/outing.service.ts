import 'reflect-metadata';
import { Injectable } from 'injection-js';
import { catchError, from, map, Observable, of } from 'rxjs';
import { IOuting } from 'src/models/outing.model';
import { Outing } from 'src/models/database/outing';

@Injectable()
export class OutingsService {

    constructor() { }

    public getOutings(): Observable<IOuting[]> {
        return from(Outing.findAll()).pipe(
            map(outings => outings.map(outing => {
                return outing.dataValues;
            }))
        ).pipe(
            catchError(() => of(null))
        );
    }

    public getOuting(id: string): Observable<IOuting> {
        return from(Outing.findOne({
            where: { id }
        })).pipe(
            map(outing => {
                return outing.dataValues;
            })
        ).pipe(
            catchError(() => of(null))
        );
    }

    public addOuting(outing: IOuting): Observable<IOuting> {
        const dbOuting = new Outing(outing);
        return from(dbOuting.save()).pipe(
            map(() => outing)
        ).pipe(
            catchError(() => of(null))
        );
    }
}
