<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">

    <h1>Create new thread in <i>{{forum.name}}</i></h1>

    <ThreadEditor ref="editor" @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import ThreadEditor from '@/components/ThreadEditor'

export default {
  components: {
    ThreadEditor
  },

  props: {
    forumId: {
      type: String,
      required: true
    }
  },

  mixins: [asyncDataStatus],

  data() {
    return {
      saved: false
    }
  },

  computed: {
    forum() {
      return this.$store.state.forums[this.forumId]
    },

    hasUnsavedChanges() {
      return (
        (this.$refs.editor.form.title || this.$ref.editor.form.text) &&
        !this.saved
      )
    }
  },

  methods: {
    ...mapActions(['createThread', 'fetchForum']),

    save({ text, title }) {
      this.createThread({
        forumId: this.forum['.key'],
        title,
        text
      }).then(thread => {
        this.saved = true
        this.$router.push({
          name: 'ThreadShow',
          params: { id: thread['.key'] }
        })
      })
    },

    cancel() {
      this.$router.push({ name: 'Forum', params: { id: this.forum['.key'] } })
    }
  },

  created() {
    this.fetchForum({ id: this.forumId }).then(() => {
      this.asyncDataStatus_fetched()
    })
  },

  beforeRouteLeave(to, from, next) {
    if (this.hasUnsavedChanges) {
      const confirmed = window.confirm('Are you sure want to leave?')
      if (confirmed) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>

<style scoped>
</style>
