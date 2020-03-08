// const DATA = [
//     {
//         "login": "abdelali-code",
//         "id": 57986145,
//         "node_id": "MDQ6VXNlcjU3OTg2MTQ1",
//         "avatar_url": "https://avatars0.githubusercontent.com/u/57986145?v=4",
//         "gravatar_id": "",
//         "url": "https://api.github.com/users/abdelali-code",
//         "html_url": "https://github.com/abdelali-code",
//         "followers_url": "https://api.github.com/users/abdelali-code/followers",
//         "following_url": "https://api.github.com/users/abdelali-code/following{/other_user}",
//         "gists_url": "https://api.github.com/users/abdelali-code/gists{/gist_id}",
//         "starred_url": "https://api.github.com/users/abdelali-code/starred{/owner}{/repo}",
//         "subscriptions_url": "https://api.github.com/users/abdelali-code/subscriptions",
//         "organizations_url": "https://api.github.com/users/abdelali-code/orgs",
//         "repos_url": "https://api.github.com/users/abdelali-code/repos",
//         "events_url": "https://api.github.com/users/abdelali-code/events{/privacy}",
//         "received_events_url": "https://api.github.com/users/abdelali-code/received_events",
//         "type": "User",
//         "site_admin": false,
//         "name": null,
//         "company": null,
//         "blog": "",
//         "location": null,
//         "email": null,
//         "hireable": null,
//         "bio": null,
//         "public_repos": 17,
//         "public_gists": 0,
//         "followers": 0,
//         "following": 0,
//         "created_at": "2019-11-20T09:19:00Z",
//         "updated_at": "2020-02-27T12:37:36Z"
//     }
// ]

const root = document.getElementById('root');


function Form(props) {
    return (
        <div className="row">
            <div className="jumbotron col-md-6">
                <form onSubmit = {props.handleSubmit} 
                    className="form-group mb-3">
                    <input type="text" 
                        placeholder="enter your github target"
                        value = {props.userName} onChange = {props.handleInput}
                        className="form-control"/>
                    <button type="submit" className="btn btn-primary mt-3">add user</button>
                </form>
            </div>
        </div>
    );
}

function Card({profile}) {
    if (profile) {
        return (
            <div>
                <img src={profile.avatar_url} alt={profile.login}/>
                <h1>{profile.login}</h1>
            </div>
        );
    }
    else {
        return (<div></div>);
    }

} 

function CardList(props) {
    const users = props.profiles.map((pro) => {
        return (
            <Card profile = {pro}/>
        );
    })
    return (
        <div>
            {users}
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        // this.handleInput = this.handleInput.bind(this);
        this.state = {
            data : [],
            userName: ''
        }
    }
    handleInput = (e) =>{
        console.log(this.state.userName);
        this.setState({
            userName: e.target.value
        })
    }
    handleSubmit = (e) => {
        fetch(`https://api.github.com/users/${this.state.userName}`)
        .then(result =>{
            return result.json();
        })
        .then(rep =>{
            this.setState({
                data: [...this.state.data, rep]
            })
        })
            // .then((responce)=>{
            //     // return JSON.parse(responce);
            //     console.log(responce)

            // })
            this.setState({
                userName: ''
            })
        e.preventDefault();
    }

    render() {
        return(
            <div className="container text-center">
                <Form userName = {this.state.userName} 
                    handleInput = {this.handleInput}
                    handleSubmit = {this.handleSubmit}/>
                <CardList profiles = {this.state.data}/>
            </div>

        );
    }
}


ReactDOM.render(
    <App/>,
    root
);