<script context="module">
  export const load = ({ url }) => {
    const currentRoute = url.pathname

    return {
      props: {
        currentRoute,
      },
    }
  }
</script>

<script lang="ts">
  export let currentRoute

  import Footer from '$lib/footer.svelte'
  import { fade } from 'svelte/transition'
  import '../app.css'
</script>

{#key currentRoute}
  <div
    in:fade={{ duration: 250, delay: 150 }}
    class="relative w-screen text-white bg-gray-900 overflow-x-hidden flex flex-col items-center"
  >
    <slot />
    <Footer />
  </div>
{/key}
