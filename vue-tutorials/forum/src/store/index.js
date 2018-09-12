import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { countObjectProperties } from '@/utils'

Vue.use(Vuex)

const makeAppendChildToParentMutation = ({ parent, child }) => {
  return (state, { childId, parentId }) => {
    const resource = state[parent][parentId] // the same as state.posts === state[posts]
    if (!resource[child]) {
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }
}

export default new Vuex.Store({
  state: {
    categories: {},
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2'
  },

  getters: {
    authUser(state) {
      // return state.users[state.authId]
      return {}
    },

    userPostsCount: state => id => countObjectProperties(state.users[id].posts),
    userThreadsCount: state => id =>
      countObjectProperties(state.users[id].threads),
    threadRepliesCount: state => id =>
      countObjectProperties(state.threads[id].posts) - 1
  },

  actions: {
    createPost({ commit, state }, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setPost', { post, postId })
      commit('appendPostToThread', { parentId: post.threadId, childId: postId })
      commit('appendPostToUser', { parentId: post.userId, childId: postId })

      return Promise.resolve(state.posts[postId])
    },

    updatePost({ commit, state }, { id, text }) {
      return new Promise((resolve, reject) => {
        const post = state.posts[id]
        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: { at: Math.floor(Date.now() / 1000), by: state.authId }
          }
        })
        resolve(post)
      })
    },

    createThread({ state, commit, dispatch }, { text, title, forumId }) {
      /* eslint-disable no-unused vars */
      return new Promise((resolve, reject) => {
        const threadId = 'greatThread' + Math.random()
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)

        const thread = {
          '.key': threadId,
          title,
          forumId,
          publishedAt,
          userId
        }

        commit('setThread', { threadId, thread })
        commit('appendThreadToForum', { parentId: forumId, childId: threadId })
        commit('appendThreadToUser', { parentId: userId, childId: threadId })

        dispatch('createPost', { text, threadId }).then(post => {
          commit('setThread', {
            threadId,
            thread: { ...thread, firstPostId: post['.key'] }
          })
        })
        resolve(state.threads[threadId])
      })
    },

    updateThread({ state, commit, dispatch }, { title, text, id }) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]
        const newThread = { ...thread, title }
        commit('setThread', { thread: newThread, threadId: id })

        dispatch('updatePost', { id: thread.firstPostId, text }).then(() => {
          resolve(newThread)
        })
      })
    },

    updateUser({ commit }, user) {
      commit('setUser', { userId: user['.key'], user })
    },

    fetchThread({ state, commit }, { id }) {
      console.log(`Firebase thread ${id}`)
      return new Promise((resolve, reject) => {
        // fetch thread
        firebase
          .database()
          .ref('threads')
          .child(id)
          .once('value', snapshot => {
            const thread = snapshot.val()
            commit('setThread', {
              threadId: snapshot.key,
              thread: { ...thread, '.key': snapshot.key }
            })
          })
        resolve(state.threads[id])
      })
    },

    fetchUser({ state, commit }, { id }) {
      console.log(`Firebase user ${id}`)
      return new Promise((resolve, reject) => {
        // fetch thread
        firebase
          .database()
          .ref('users')
          .child(id)
          .once('value', snapshot => {
            const user = snapshot.val()
            commit('setUser', {
              userId: snapshot.key,
              user: { ...user, '.key': snapshot.key }
            })
          })
        resolve(state.users[id])
      })
    },

    fetchPost({ state, commit }, { id }) {
      console.log(`Firebase post ${id}`)
      return new Promise((resolve, reject) => {
        // fetch thread
        firebase
          .database()
          .ref('posts')
          .child(id)
          .once('value', snapshot => {
            const post = snapshot.val()
            commit('setPost', {
              postId: snapshot.key,
              post: { ...post, '.key': snapshot.key }
            })
          })
        resolve(state.posts[id])
      })
    }
  },

  mutations: {
    setPost(state, { post, postId }) {
      Vue.set(state.posts, postId, post)
    },

    setUser(state, { user, userId }) {
      Vue.set(state.users, userId, user)
    },

    setThread(state, { thread, threadId }) {
      Vue.set(state.threads, threadId, thread)
    },

    appendPostToThread: makeAppendChildToParentMutation({
      parent: 'threads',
      child: 'posts'
    }),

    appendPostToUser: makeAppendChildToParentMutation({
      parent: 'users',
      child: 'posts'
    }),

    appendThreadToForum: makeAppendChildToParentMutation({
      parent: 'forums',
      child: 'threads'
    }),

    appendThreadToUser: makeAppendChildToParentMutation({
      parent: 'users',
      child: 'threads'
    })
  }
})
