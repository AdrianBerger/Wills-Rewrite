const Command = require("../../structs/command.struct");
module.exports = new Command("unclaim", "Unclaim a donut.", 2)
	.setFunction(async(client, message, args, now) => {
		await message.channel.assert(client.mainChannels.kitchen.id);
		const order = await client.utils.getOrder(message, args, 0, { is: 1 }, false, "claim");
		if (!order) return;
		await order.update({ claimer: null, status: 0 });
		return message.channel.send(`You have unclaimed order \`${order.id}\`.`);
	});
