import type { Context } from "pinecone-router";

export default (ctx: Context) => {
	if (ctx.params.name.toLowerCase() == 'home') {
		return ctx.redirect('/')
	}
}