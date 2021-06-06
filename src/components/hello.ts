import { AlpineComponent } from 'alpine-typescript-extras'

export default class extends AlpineComponent {
  name(): string | null {
    const name: string | null = this.$router.params.name
    if (name)
      return `${name}!`

    return null
  }

  input() {
    return this.$refs.input.value.trim()
  }
}
