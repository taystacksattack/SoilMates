import { useDispatch, useSelector, Sort  } from "react-redux"
import { useEffect } from "react"
import {Link } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import OpenModalButton from '../OpenModalButton'


const CurrentPosts = () => {
    const dispatch = useDispatch()

    const postsObj= useSelector(state => state.posts.allPosts)
    const user = useSelector(state => state.session.user)
    // console.log(user)

    // WILL NEED TO GRAB RECOMMENDATIONS/COMMENTS/USERNAMES

    //Sorting helper function will go here

    useEffect(()=>{
        dispatch(getPostsThunk())
    }, [dispatch ])

    if (!postsObj) return (<h2>Loading...</h2>)

    return (
        <div id="posts-whole-wrapper">
            <div id="posts-list-wrapper">

                <h2>My Posts</h2>
                <br></br>
                <div id="new-post">
                    <Link exact to ={`/posts/new`}>New Post</Link>
                </div>
                <br></br>

                {/* CONSIDER YOUR SORTING HERE */}

                {postsObj && Object.values(postsObj).map(post => {
                    if (post.ownerId === user.id){ //filters out from all posts
                    return (
                        <div key={post.id}>
                            <Link exact to ={`/posts/${post.id}`} id="post-title">{post.title}</Link>
                            <p id="body-preview">{`${post.body.slice(0,150)}...`}</p>
                            {/* <Link exact to ={`/posts/${post.id}/edit`} id="post.id">{post.title}</Link> */}
                            {/* <br></br> */}

                            <br></br>
                        </div>
                    )}
                })}
            </div>
        </div>
    )
}

export default CurrentPosts
