import { ACommand } from '../handlers/command';
import { HelpCommand } from '../handlers/help';
import { FAQCommand } from '../handlers/faq';
import { Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import * as CONFING_JSON from '../../config.json' assert { type: 'json' };
import { CreateOutingCommand } from '../handlers/createOuting';
import { IConfig } from 'src/models/config.model';

const CONFIG: IConfig = (CONFING_JSON as any).default;

export class CommandsDeployer {
	private _commandNames = [
		HelpCommand.NAME,
		FAQCommand.NAME,
		CreateOutingCommand.NAME
	]

	private rest = new REST({ version: '10' }).setToken(CONFIG.token);
	private _commands: Array<ACommand>;

	constructor() {
		this._commands = [];
		for (let i = 0; i < this._commandNames.length; i++) {
			let command: ACommand;
			switch (this._commandNames[i]) {
				case HelpCommand.NAME:
					command = new HelpCommand();
					break;
				case FAQCommand.NAME:
					command = new FAQCommand();
					break;
				case CreateOutingCommand.NAME:
					command = new CreateOutingCommand();
					break;
			}
			if (command == null) {
				continue;
			}
			this._commands.push(command);
		}
	}

	public get commands() {
		return this._commands;
	}

	public run(): Promise<any> {
		console.log(`Started refreshing ${this._commandNames.length} application (/) commands.`);

		return this.rest.put(
			Routes.applicationGuildCommands(CONFIG.clientId, CONFIG.guildId),
			{ body: this._commands.map(_commands => _commands.data) },
		);
	}
}
