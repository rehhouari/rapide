import { Context } from 'pinecone-router'

// router settings
export const settings = {
  allowNoHandler: true,
  middlewares: {
    views: {
      selector: '#app',
      enable: true,
      basePath: '/pages/',
    },
  },
}

const handlers = <{[key: string]: (context: Context) => 'stop' | void}>{
  hello: (ctx) => {
    if (ctx.params.name.toLowerCase() === 'home')
      return ctx.redirect('/')
  },
}

export const router = () => ({ settings, ...handlers })

window.router = router
