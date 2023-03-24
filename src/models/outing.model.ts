import { OutingType } from "./outingType.enum";

export interface IOuting {
    id: string;
    label: string;
    description: string;
    period: Array<Date>;
    type: OutingType;
    creatorDiscordId: string;
    place: string;
    attendeeMax: number;
}
