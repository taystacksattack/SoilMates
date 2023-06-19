import { useDispatch, useSelector, Sort  } from "react-redux"
import { useState, useEffect} from "react"
import {Link } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import OpenModalButton from '../OpenModalButton'


const Feed = () => {
    const dispatch = useDispatch()

    const [posts, setPosts] = useState([])
    const [sortType, setSortType] = useState("created_at")

    const postsObj= useSelector(state => state.posts.allPosts)
    // WILL NEED TO GRAB RECOMMENDATIONS/COMMENTS/USERNAMES

    //Sorting helper function
    let postsArr
    if (postsObj) postsArr = Object.values(postsObj)
    useEffect(()=>{
        const sortedPosts = type =>{
            const sorted = postsArr.sort((a,b)=>{
                if (type !== "title"){
                    return new Date(b[type]) - new Date(a[type])
                } else{
                    return a.title.localeCompare(b.title)
                }
            })
            setPosts(sorted)
        }
        sortedPosts(sortType)
    }, [sortType, postsArr.length])

    useEffect(()=>{
        dispatch(getPostsThunk())
    }, [dispatch ])

    if (!postsObj) return (<h2>Loading...</h2>)

    return (
        <div id="posts-whole-wrapper">
            <div id="posts-list-wrapper">

                <h2>All Questions</h2>
                <br></br>
                <div id="new-post">
                    <Link exact to ={`/posts/new`}>New Post</Link>
                </div>
                <br></br>

                {/* CONSIDER YOUR SORTING HERE */}
                <h3>Sort by:</h3>
                <button onClick={(e)=>setSortType("title")}>Title</button>
                <button onClick={e=>setSortType("created_at")}>Newest</button>
                {/* <button>Trending</button> */}
                {/* <button>Active?</button> */}
                {/* <button>Unanswered</button> */}

                {postsObj && posts.map(post => {
                    return (
                        <div key={post.id}>
                            <Link exact to ={`/posts/${post.id}`} id="post-title">{post.title}</Link>
                            <p id="body-preview">{`${post.body.slice(0,150)}...`}</p>
                            <p>Posted by: {post.user.username} on {post.created_at.slice(0,16)}</p>
                            {/* <Link exact to ={`/posts/${post.id}/edit`} id="post.id">{post.title}</Link> */}
                            {/* <br></br> */}

                            <br></br>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Feed
