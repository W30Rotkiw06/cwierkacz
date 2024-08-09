function Post(props){
    const {username, post_text, created_at} = props
    const date = new Date(created_at)
    const date_formated = date.toDateString()
    return(
        <div className="post">
            <h1 className="post-author">@{username}</h1>
            <p className="post-text">{post_text}</p>
            <p className="post-date">{date_formated}</p>
        </div>
    )
}
export default Post