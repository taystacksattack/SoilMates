//actions
const  GET_ALL_COMMENTS = "comments/ GET_ALL_COMMENTS"
const GET_COMMENTS = 'comments/GET_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'


// action collectors
const getAllComments = (comments) => {
    return {
        type: GET_ALL_COMMENTS,
        comments
    }
}

const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

// gets the all the comments...!
export const getAllCommentsThunk = () => async(dispatch) => {
    const response = await fetch ("/api/comments")
    const data = await response.json()
    dispatch(getAllComments(data))
    // console.log(data)
    return data
}

//get all the comments for a particular post
export const getCommentsThunk = (postId) => async (dispatch) => {
    console.log("post id in thunk", postId)
    // console.log()
    const response = await fetch(`/api/posts/${postId}/comments`)
    const data = await response.json()
    dispatch(getComments(data))
    console.log(data)
    return data
}


const initialState = {comments: {}}

export const commentReducer = (state = initialState, action) => {
    switch(action.type){
        case  GET_ALL_COMMENTS:
            const allCommentsState = {allComments:{}}
            if (action.comments.length){
                action.comments.forEach(comment=> {
                    allCommentsState.allComments[comment.id] = comment
                })
            }
        return allCommentsState
        case GET_COMMENTS:
            const newState = {allComments:{}}
            if (action.comments.length){
                action.comments.forEach((comment => {
                    newState.allComments[comment.id] = comment
                }))
            }
        return newState
        default:
            return state
    }
}
