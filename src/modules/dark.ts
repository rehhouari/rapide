import Spruce from '~/core/store'

export default () => {
  // define dark mode store.
  Spruce.store(
    'dark',
    {
      on: false,
    },
    window.localStorage,
  )

  window.toggleDark = () => {
    Spruce.toggle('dark.on')
    set()
  }

  set()
}

function set() {
  document.children[0].classList.toggle('dark', Spruce.get('dark.on'))
}
