<template>
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
          v-model="text"
        ></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
</template>

<script>
export default {
  props: {
    threadId: {
      required: false
    },

    post: {
      type: Object,
      validator: obj => {
        const keyIsValid = typeof obj['.key'] === 'string'
        const textIsValid = typeof obj.text === 'string'
        const valid = keyIsValid && textIsValid

        if (!valid) {
          console.error(
            'The post prop object must include a .key and text attributes'
          )
        }

        return valid
      }
    }
  },
  data() {
    return {
      text: this.post ? this.post.text : ''
    }
  },

  computed: {
    isUpdate() {
      return !!this.post
    }
  },

  methods: {
    save() {
      this.persist().then(post => {
        this.$emit('save', { post })
      })
    },

    create() {
      const post = {
        text: this.text,
        threadId: this.threadId
      }

      this.text = ''

      this.$emit('save-post', { post })
      return this.$store.dispatch('createPost', post)
    },

    update() {
      const payload = {
        id: this.post['.key'],
        text: this.text
      }

      return this.$store.dispatch('updatePost', payload)
    },

    persist() {
      return this.isUpdate ? this.update() : this.create()
    }
  }
}
</script>
