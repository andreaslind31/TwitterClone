
Vue.component('tweet-message', {
    props: {
        'tweet': Object
    },
    template:`
    <div class="tweetMsg">
        <p>
            {{ tweet.text}}
        </p>
        <div class="tweetDate">
            <i class="fas fa-calendar fa-sm fa-fw"></i>{{ tweet.date }}
        </div>
        <div class="tweet_remove" @click="$emit('remove-tweet', 'index')">
            <span class="remove">Delete this tweet <i class="fas fa-trash fa-sm fa-fw"></i></span>
        </div>
    </div>`
});


let app = new Vue({
    el: '#app',
    data: {
        userData: {},
        usersID: 0,
        name: "",
        email: "",
        password: "",
        max_length: 25,
        max_pass_length: 16,
        max_tweet: 200,
        error: "",
        registered: false,
        tweetMsg: "",
        tweets: []
    },

    methods: {
        registerAccount() {

            if (this.name.length > 0 && this.name.length <= this.max_length && this.email !== "" && this.password !== "") {

                this.userData.id = ++this.usersID,
                    this.userData.name = this.name,
                    this.userData.email = this.email,
                    this.userData.password = this.password
                this.registered = true;

            } else {
                this.error = "Complete all fields"
            }

            localStorage.setItem('simple_tweet_registered', true)
            localStorage.setItem('simple_tweet_registered_user', JSON.stringify(this.userData))

            this.name = "";
            this.email = "";
            this.password = "";
        },
        sendTweet() {
            this.tweets.unshift(
                {
                    text: this.tweetMsg,
                    date: new Date().toLocaleTimeString()
                }

            );
            this.tweetMsg = "";
            // tranform the tweets to a JSON
            stringTweets = JSON.stringify(this.tweets)
            localStorage.setItem('simple_tweet_tweets', stringTweets)
        },
        removeTweet(index) {
            let removeIt = confirm("Are you sure you want to remove this tweet?")
            if (removeIt) {
                this.tweets.splice(index, 1);
                localStorage.simple_tweet_tweets = JSON.stringify(this.tweets)
            }
        }
    },
    created() {
        if (localStorage.getItem("simple_tweet_registered") === 'true') {
            this.registered = true;
        }
        if (localStorage.getItem('simple_tweet_registered_user')) {
            this.userData = JSON.parse(localStorage.getItem('simple_tweet_registered_user'))
        }
        if (localStorage.getItem("simple_tweet_tweets")) {
            console.log("There is a list of tweets");
            this.tweets = JSON.parse(localStorage.getItem('simple_tweet_tweets'))

        } else {
            console.log("No tweets here");
        }
    }

});