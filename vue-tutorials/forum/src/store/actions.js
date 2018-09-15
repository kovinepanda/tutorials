import firebase from 'firebase'

export default {
  createPost ({commit, state}, post) {
    const postId = firebase.database().ref('posts').push().key
    post.userId = state.authId
    post.publishedAt = Math.floor(Date.now() / 1000)

    const updates = {}
    updates[`posts/${postId}`] = post
    updates[`threads/${post.threadId}/posts/${postId}`] = postId
    updates[`users/${post.userId}/posts/${postId}`] = postId
    firebase.database().ref().update(updates)
      .then(() => {
        commit('setItem', {resource: 'posts', item: post, id: postId})
        commit('appendPostToThread', {parentId: post.threadId, childId: postId})
        commit('appendPostToUser', {parentId: post.userId, childId: postId})
        return Promise.resolve(state.posts[postId])
      })
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

  fetchForum({ dispatch }, { id }) {
    return dispatch('fetchItem', { resource: 'forums', id })
  },

  fetchCategory({ dispatch }, { id }) {
    return dispatch('fetchItem', { resource: 'categories', id })
  },

  fetchThread({ dispatch }, { id }) {
    return dispatch('fetchItem', { resource: 'threads', id })
  },

  fetchUser({ dispatch }, { id }) {
    return dispatch('fetchItem', { resource: 'users', id })
  },

  fetchPost({ dispatch }, { id }) {
    return dispatch('fetchItem', { resource: 'posts', id })
  },

  fetchCategories({ dispatch }, { ids }) {
    return dispatch('fetchItems', { resource: 'categories', ids })
  },

  fetchForums({ dispatch }, { ids }) {
    return dispatch('fetchItems', { resource: 'forums', ids })
  },

  fetchThreads({ dispatch }, { ids }) {
    return dispatch('fetchItems', { resource: 'threads', ids })
  },

  fetchPosts({ dispatch }, { ids }) {
    return dispatch('fetchItems', { resource: 'posts', ids })
  },

  fetchAllCategories({state, commit}) {
    console.log('🔥‍', 'all categories')
    return new Promise((resolve, reject) => {
      firebase.database().ref('categories').once('value', snapshot => {
        const categoriesOject = snapshot.val()
        Object.keys(categoriesOject).forEach(categoryId => {
          const category = categoriesOject[categoryId]
          commit('setItem', { resource: 'categories', id: categoryId, item: category })
        })
        resolve(Object.values(state.categories))
      })
    })
  },

  fetchItem({ state, commit }, { id, resource }) {
    console.log('🔥‍', resource, id)
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(resource)
        .child(id)
        .once('value', snapshot => {
          commit('setItem', {
            resource,
            id: snapshot.key,
            item: snapshot.val()
          })
          resolve(state[resource][id])
        })
    })
  },

  fetchItems({ dispatch }, { ids, resource }) {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
    return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource })))
  }

}
