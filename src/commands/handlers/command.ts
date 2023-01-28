export abstract class ACommand {
    data: any;
    description: string;

    public execute(interaction: any) {
        if (!interaction.isChatInputCommand()) return;
    }
}