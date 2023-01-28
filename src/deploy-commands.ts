import { CommandsDeployer } from "./commandsDeployer";

const commandsDeployer = new CommandsDeployer();

commandsDeployer.run().then(
    data => console.log(`Successfully reloaded ${data.length} application (/) commands.`)
);
