<script context="module">
  export const load = async ({ fetch }) => {
    const posts = await fetch('/api/posts.json')
    const allPosts = await posts.json()

    return {
      props: {
        postsMetadata: allPosts,
      },
    }
  }
</script>

<script>
  export let postsMetadata

  import Head from '$lib/head/index.svelte'
  import { onMount } from 'svelte'

  let posts = []
  onMount(async () => {
    for (let i = 0; i < postsMetadata.length; i++) {
      posts.push({
        meta: postsMetadata[i],
        component: (await import(`.${postsMetadata[i].path}.md`)).default,
      })
    }
    posts = posts
  })
</script>

<svelte:head>
  <title>idunnett</title>
</svelte:head>
<Head />
<div class="flex flex-col gap-10 w-full items-center justify-center py-16 px-4">
  {#each posts as post}
    <svelte:component this={post.component} path={post.meta.path} />
  {/each}
</div>
