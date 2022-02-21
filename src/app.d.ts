/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
  interface Locals {}

  interface Platform {}

  interface Session {}

  interface Stuff {}
}

type Post = {
  id: string
  frontmatter: {
    date: Date
    title: string
    slug: string
    image?: {
      fileName: string
      reference?: string
      alt?: string
    }
    video?: string
    type?: string
  }
  body: string
}
