<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch('/api/posts.json')
    const postsMetadata = await res.json()

    return {
      props: {
        postsMetadata,
      },
    }
  }
</script>

<script>
  export let postsMetadata

  import Head from '$lib/head/index.svelte'
  import Post from '$lib/Post.svelte'
</script>

<svelte:head>
  <title>idunnett</title>
</svelte:head>

<Head />

<div class="flex flex-col gap-10 w-full items-center justify-center py-16 px-4">
  {#each postsMetadata as post}
    <Post html={post.html} path={post.path} />
  {/each}
</div>
