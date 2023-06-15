//actions
const GET_FEED = 'posts/GET_FEED'
const GET_POSTS = 'posts/GET_POSTS'
const CREATE_POST = 'posts/CREATE_POST'
const EDIT_POST = 'posts/EDIT_POST'
const DELETE_POST = 'posts/DELETE_POST'


//action collectors

const getFeed = (posts) => {
    return {
        type: GET_FEED,
        posts
    }
}

const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

const createPost = (post) => ({
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


//THESE ARE THE THUNKS

// export const getAllPostsThunk = () => async (dispatch) => {
//     try {
//         const response =  await fetch("/api/posts/feed")
//         const data = await response.json();
//         console.log("data in the backend", data)
//         dispatch(getFeed(data))
//         return data

//     }catch(e){
//         console.log("here are the errors", e)
//         return e
//     }
// }


//all of posts - this has been re-purpopsed to grab all the posts ever, and then the front end sorts by user
export const getPostsThunk = () => async (dispatch) => {
    try {
        const response =  await fetch("/api/posts")
        const data = await response.json();
        // console.log("data in the backend", data)
        dispatch(getPosts(data))
        return data

    }catch(e){
        console.log("here are the errors", e)
        return e
    }
}

//NewPost
export const createPostThunk = (post) => async (dispatch) => {
    let response
    try{
        response = await fetch("/api/posts/new", {
            method: 'POST',
            body: post
        })
        const data = await response.json()
        dispatch(createPost(data))
        return data
    } catch(e){
        const data = await response.json()
        if(data.errors){
            return data.errors
        } else {
            return ["An error has occurred. Please try again."]
        }
    }
}

export const editPostThunk = (postId, post) => async (dispatch) => {
    try {
        // console.log("IN THE THUNK",postId)
        // console.log("in the thunk ", post)
        const response = await fetch(`/api/posts/${postId}/edit`,{
            method: 'PUT',
            headers: {"Content-Type": "application/json"}, // need to stringify here so that the form validator is happy
            body: JSON.stringify(post)
        })
        const {result} = await response.json()
        dispatch(editPost(result))
        return
    }catch(e){
        return e
    }
}


export const deletePostThunk = (postId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/posts/${postId}/delete`, {
            method: "DELETE"
        })
        const result = await response.json()
        dispatch(deletePost(postId))
        return result
    }catch(e){
        return e
    }
}



//REDUCER
const initialState = { allPosts : {} }

export default function postsReducer (state= initialState, action){
    switch (action.type){
        case GET_POSTS:
            const newState = { allPosts: {}}
            // console.log("action",action)
            // console.log("action.posts", action.posts)
                if (action.posts.length){
                    action.posts.forEach((post => {
                        newState.allPosts[post.id] = post
                    }))
                }
            return newState
        case DELETE_POST:
            const deleteState= {...state, allposts:{...state.allPosts}}
            delete deleteState.allPosts[action.postId]
            return deleteState
        default:
            return state
    }
}
