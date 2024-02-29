<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      VCard.post-card(hover)
        VImg(:src="image[0]" cover height="200")
        VCardTitle
          RouterLink.text-primary.text-decoration-none(:to="'/posts/' + _id") {{ title }}
        VCardSubtitle {{ createdAt }}
        VCardText(style="white-space: pre;") {{ content }}
</template>

<script setup>
const props = defineProps(['_id', 'content', 'image', 'title', 'release', 'createdAt'])

</script>
