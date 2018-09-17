import firebase from 'firebase'

export default {
  createPost ({commit, state}, post) {
    const postId = firebase.database().ref('posts').push().key
    post.userId = state.authId
    post.publishedAt = Math.floor(Date.now() / 1000)

    const updates = {}
    updates[`posts/${postId}`] = post
    updates[`threads/${post.threadId}/posts/${postId}`] = postId
    updates[`threads/${post.threadId}/contributors/${post.userId}`] = post.userId
    updates[`users/${post.userId}/posts/${postId}`] = postId
    firebase.database().ref().update(updates)
      .then(() => {
        commit('setItem', {resource: 'posts', item: post, id: postId})
        commit('appendPostToThread', {parentId: post.threadId, childId: postId})
        commit('appendContributorToThread', {parentId: post.threadId, childId: post.userId})
        commit('appendPostToUser', {parentId: post.userId, childId: postId})
        return Promise.resolve(state.posts[postId])
      })
  },

  updatePost({ commit, state }, { id, text }) {
    return new Promise((resolve, reject) => {
      const post = state.posts[id]
      const edited = { at: Math.floor(Date.now() / 1000), by: state.authId }
      commit('setPost', { postId: id, post: { ...post, text, edited } })

      const updates = {text, edited}
      firebase.database().ref('posts').child(id).update(updates)
        .then(() => {
          resolve(post)
        })
    })
  },

  createThread({ state, commit }, { text, title, forumId }) {
    /* eslint-disable no-unused vars */
    return new Promise((resolve, reject) => {
      const threadId = firebase.database().ref('threads').push().key
      const postId = firebase.database().ref('posts').push().key
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)

      const thread = {
        title,
        forumId,
        publishedAt,
        userId,
        firstPostId: postId,
        posts: {}
      }
      thread.posts[postId] = postId
      const post = {text, publishedAt, threadId, userId}

      const updates = {}
      updates[`threads/${threadId}`] = thread
      updates[`forums/${forumId}/threads/${threadId}`] = threadId
      updates[`users/${userId}/threads/${threadId}`] = threadId

      updates[`posts/${postId}`] = post
      updates[`users/${post.userId}/posts/${postId}`] = postId

      firebase.database().ref().update(updates)
        .then(() => {
          commit('setItem', {resource: 'threads', item: thread, id: threadId})
          commit('appendThreadToForum', {parentId: forumId, childId: threadId})
          commit('appendThreadToUser', {parentId: userId, childId: threadId})

          commit('setItem', {resource: 'posts', item: post, id: postId})
          commit('appendPostToThread', {parentId: post.threadId, childId: postId})
          commit('appendPostToUser', {parentId: post.userId, childId: postId})

          resolve(state.posts[postId])
        })
    })
  },

  updateThread({ state, commit, dispatch }, { title, text, id }) {
    return new Promise((resolve, reject) => {
      const thread = state.threads[id]
      const post = state.posts[thread.firstPostId]
      const edited = { at: Math.floor(Date.now() / 1000), by: state.authId }

      const updates = {}
      updates[`posts/${thread.firstPostId}/text`] = text
      updates[`posts/${thread.firstPostId}/edited`] = edited
      updates[`threads/${id}/title`] = title

      firebase.database().ref().update(updates)
        .then(() => {
          commit('setThread', { thread: {...thread, title}, threadId: id })
          commit('setPost', { post: {...post, text, edited}, postId: id })
          resolve(post)
        })
    })
  },

  registerUserWithEmailAndPassword({dispatch}, {email, name, username, password, avatar = null}) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        return dispatch('createUser', {id: user.uid, email, name, username, password, avatar})
      })
  },

  createUser ({state, commit}, {id, email, name, username, avatar = null}) {
    return new Promise((resolve, reject) => {
      const registeredAt = Math.floor(Date.now() / 1000)
      const usernameLower = username.toLowerCase()
      email = email.toLowerCase()
      const user = {avatar, email, name, username, usernameLower, registeredAt}
      firebase.database().ref('users').child(id).set(user)
        .then(() => {
          commit('setItem', {resource: 'users', id: id, item: user})
          resolve(state.users[id])
        })
    })
  },

  updateUser({ commit }, user) {
    commit('setUser', { userId: user['.key'], user })
  },

  fetchAuthUser({dispatch, commit}) {
    const userId = firebase.auth().currentUser.uid
    return dispatch('fetchUser', { id: userId })
      .then(() => {
        commit('setAuthId', userId)
      })
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
