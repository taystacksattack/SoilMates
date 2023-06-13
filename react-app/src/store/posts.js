//actions
const GET_POSTS = 'posts/GET_POSTS'
const CREATE_POST = 'posts/CREATE_POST'
const EDIT_POST = 'posts/EDIT_POST'
const DELETE_POST = 'posts/DELETE_POST'


//action collectors

const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

const newPost = (post) => ({
    type: CREATE_POST,
    post
})

const editPost = (post) => ({
    type: EDIT_POST,
    post
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})


//these are the thunks
export const getPostsThunk = () => async (dispatch) => {
    try {
        const response =  await fetch("/api/posts")
        const data = await response.json();
        console.log("data in the backend", data)
        dispatch(getPosts(data))
        return data

    }catch(e){
        console.log("here are the damn errors", e)
    }
}


//REDUCER
const initialState = { allPosts : {} }

export default function postsReducer (state= initialState, action){
    switch (action.type){
        case GET_POSTS:
            const newState = { allPosts: {}}
                if (action.posts.length){
                    action.posts.forEach((post => {
                        newState.allPosts[post.id] = post
                    }))
                }
            return newState
        default:
            return state
    }
}
