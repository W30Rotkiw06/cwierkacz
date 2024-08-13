import { Component } from "react";
import Post from "./Post";
class Feed extends Component{
    constructor(props){
        super(props);

        let time = new Date()
        this.state = {
            posts: [],
            time: time.toDateString(),
            post_text: ""
        }
    }

    componentDidMount = async()=>{
        this.updateFeed()

        this.props.supabase.channel(this.props.username).on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, payload => {
            console.log('Change received!', payload)
            this.updateFeed()
            }).subscribe()
    }
    componentWillUnmount = async ()=>{
        this.props.supabase.removeAllChannels()
    }


    updateFeed = async()=>{
        let {data, error} = await this.props.supabase.from("posts").select().order('id', { ascending: false })
        if(error){console.error(error)}
        else{
            this.setState({posts: data})
        }
        
    }

    handlePostTextChange = event =>{
        this.setState({post_text: event.target.value})
    }

    postNewPost = async()=>{
        await this.props.supabase.from("posts").insert({post_value: this.state.post_text, username: this.props.username})
        this.setState({post_text: ""})
    }

    render(){
        return(
            <div className="feed">

                <div className="post">
                    <h1 className="post-author">Add new post</h1>
                    <textarea
                    className="post-text-input"
                    cols="32"
                    rows="5"
                    maxlength="200"
                    placeholder="Post something..."
                    value={this.state.post_text}
                    onChange={this.handlePostTextChange}
                    ></textarea>
                    <p className="post-date">{this.state.time}</p>
                    <button onClick={this.postNewPost} disabled={this.state.post_text.length === 0? true: false} className="post-button">POST</button>
                </div>
                <hr className="horizontal-line"/>
                {
                    this.state.posts.map(post =>(<Post key={post.id} username={post.username} post_text={post.post_value} created_at={post.created_at}/>))
                }

            </div>
        )
    }
}

export default Feed