///<reference path="./.d.ts"/>
"use strict";

import util = require("util");
import options = require("./options");

export class CommandExecutor implements ICommandExecutor {

	public execute(): IFuture<void> {
		var commandName = this.getCommandName();
		var commandArguments = this.getCommandArguments();

		return this.executeCore(commandName, commandArguments);
	}

	private executeCore(commandName: string, commandArguments: string[]): IFuture<void> {
		var command = new (require("./commands/" + commandName).Command)();
		if(!command) {
			throw new Error(util.format("Unable to resolve commandName %s", commandName));
		}

		return command.execute(commandArguments);
	}

	private getCommandArguments(): string[] {
		var remaining = options._;
		return remaining.length > 1 ? remaining.slice(1): [];
	}

	private getCommandName(): string {
		var remaining = options._;
		return remaining.length > 0 ? remaining[0].toLowerCase() : "help";
	}
}