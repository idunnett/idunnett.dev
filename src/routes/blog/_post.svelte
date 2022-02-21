<script>
  // These props get filled in from the page's front matter
  export let title
  export let date
  export let image
  export let video
  export let path

  date = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  let divHeight
  let collapsed = path ? true : false
</script>

<svelte:head>
  {#if !path}
    <title>{title}</title>
    <meta property="og:title" content={title} />
    {#if image}
      <meta property="og:image" content={image.fileName} />
    {/if}
  {/if}
</svelte:head>

<article class="relative w-full md:w-[740px] text-white" class:my-16={!path}>
  <a href={path}>
    <h1
      class="text-4xl text-blue-400 my-3 font-bold"
      class:hover:text-blue-300={path}
    >
      {title}
    </h1>
  </a>
  <small class="text-gray-400 font-semibold">
    {date}
  </small>
  {#if image}
    <div class="flex flex-col my-8">
      <img
        src={'/images/' + image.fileName}
        alt={image.alt}
        class="w-full h-80 object-contain"
      />
    </div>
  {/if}
  <div
    bind:clientHeight={divHeight}
    class="mdx text-xl my-8 leading-8 shadow-inner overflow-hidden transition-all duration-200 ease-linear"
    class:max-h-96={collapsed}
  >
    <slot />
  </div>
  {#if collapsed && divHeight && divHeight >= 384}
    <div
      class="relative flex justify-center items-center bg-gradient-to-b from-transparent h-24 to-gray-900 -translate-y-32"
    >
      <button
        on:click={() => (collapsed = false)}
        class="absolute top-full my-8 bg-blue-400 py-1 px-2 rounded-md"
      >
        Show more
      </button>
    </div>
  {/if}
  {#if video}
    <iframe
      {title}
      src={video}
      class="w-full h-80"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    />
  {/if}
  <div class="w-3/4 h-0.5 rounded-full bg-white opacity-10 mt-16 m-auto" />
</article>
