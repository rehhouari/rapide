import '~/styles/main.css'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import 'virtual:pinecone-update'
import { addRoutes } from 'virtual:pinecone-routes'
import '@purge-icons/generated'
import { component, addTitles } from '@leanadmin/alpine-typescript'
import { router } from '~/core/router'

router()
window.addRoutes = addRoutes

// import modules
Object.values(import.meta.globEager('./modules/*.{js,ts}')).map(m =>
  m.default(),
)

// register components
Object.entries(import.meta.globEager('./components/*.{js,ts}')).map(
  ([file, value]) => {
    // @ts-ignore
    const name = file.replace(/\.\/components\/(.*[/])?([^/].+[^/])\.(js|ts)/gmi, '$2')
    component(name, value.default)
    return true
  },
);

// import dependencies
(async() => {
  // import plugins before alpine
  // @ts-ignore
  await import('alpine-magic-helpers')
  // @ts-ignore
  await import('@ryangjchandler/alpine-clipboard')
  // @ts-ignore
  await import('@ryangjchandler/alpine-toggle')
  // @ts-ignore
  await import('@ryangjchandler/x-else')
  addRoutes()
  await import('pinecone-router-middleware-views')
  await import('pinecone-router')
  // import alpinejs
  await import('alpinejs')
  // this will add 'x-title' attributes to all components, must be imported after alpinejs.
  addTitles()
})()
