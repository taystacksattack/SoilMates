//actions
const  GET_ALL_COMMENTS = "comments/ GET_ALL_COMMENTS"
const GET_COMMENTS = 'comments/GET_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
const UPVOTE_COMMENT = 'comments/UPVOTE_COMMENT'
const DOWNVOTE_COMMENT = 'comments/DOWNVOTE_COMMENT'


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

const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}
const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

const upvoteComment = (comment) => {
    return {
        type: UPVOTE_COMMENT,
        comment
    }
}

const downvoteComment = (comment) => {
    return {
        type: DOWNVOTE_COMMENT,
        comment
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
    // console.log("post id in thunk", postId)
    // console.log()
    const response = await fetch(`/api/posts/${postId}/comments`)
    const data = await response.json()
    dispatch(getComments(data))
    // console.log(data)
    return data
}

export const createCommentThunk = (postId, comment) => async (dispatch)=> {
    // console.log("postID in thunk", postId)
    // console.log("comment in thunk", comment)
    let response
    try{
        response = await fetch(`/api/posts/${postId}/comment`, {
            method: 'POST',
            body: comment
        })
        const data = await response.json()
        dispatch(createComment(data))
        // console.log(data)
        return data
    }catch(e){
        return e
    }
}

export const editCommentThunk = (commentId, comment) => async (dispatch) => {
    let response
    try{
        response = await fetch(`/api/comments/${commentId}/edit`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(comment)
        })
        const result = await response.json()
        dispatch(editComment(result))
        return
    }catch(e){
        return e
    }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/${commentId}/delete`, {
            method: "DELETE"
        })
        const result = await response.json()
        dispatch(deleteComment(commentId))
        return result
    }catch(e){
        return e
    }
}


export const upvoteCommentThunk = (commentId) => async (dispatch) => {
    try{
        const response = await fetch(`/api/comments/${commentId}/upvote`, {
            method:"POST"
        })
        const result = await response.json()
        dispatch(upvoteComment(result))
        return result
    }catch (e){
        return e
    }
}


export const downvoteCommentThunk = (commentId) => async (dispatch) => {
    try{
        const response = await fetch(`/api/comments/${commentId}/downvote`, {
            method:"DELETE"
        })
        const result = await response.json()
        dispatch(downvoteComment(result))
        return result
    }catch (e){
        return e
    }
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
        case CREATE_COMMENT:
            const newCommentState = {...state, allComments:{...state.allComments}}
            newCommentState.allComments[action.comment.id] = action.comment
            return newCommentState
        case EDIT_COMMENT:
            const editState = {...state, allComments: {...state.allComments}}
            editState.allComments[action.comment.id] = action.comment
            return editState
        case DELETE_COMMENT:
            const deleteState = {...state, allComments: {...state.allComments}}
            delete deleteState.allComments[action.commentId]
            return deleteState
        case UPVOTE_COMMENT:
            const upvoteState = {...state, allComments: {...state.allComments}}
            upvoteState.allcomments[action.comment.id] = action.comment
            return upvoteState
        case DOWNVOTE_COMMENT:
            const downvoteState = {...state, allComments: {...state.allComments}}
            downvoteState.allcomments[action.comment.id] = action.comment
            return downvoteState
        default:
            return state
    }
}
