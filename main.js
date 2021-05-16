

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
                this.error = "Complete all the form fields"
            }

            /* Add registration data to the local storage */
            localStorage.setItem('simple_tweet_registered', true)
            /* Add the whole userData object as JSON string */
            localStorage.setItem('simple_tweet_registered_user', JSON.stringify(this.userData))

            /* Clear the registration inputs */
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

            //console.log(this.tweets);
            stringTweets = JSON.stringify(this.tweets)
            //console.log(stringTweets);
            localStorage.setItem('simple_tweet_tweets', stringTweets)
        },
        removeTweet(index) {
            let removeIt = confirm("Are you sure you want to remove this tweet?")
            if (removeIt) {
                this.tweets.splice(index, 1);
                /* Remove the item also from the local storage */
                localStorage.simple_tweet_tweets = JSON.stringify(this.tweets)
            }
        }
    },
    created() {
        /* Check if the user is registered and set the registered to true */
        if (localStorage.getItem("simple_tweet_registered") === 'true') {
            this.registered = true;
        }

        if (localStorage.getItem('simple_tweet_registered_user')) {
            this.userData = JSON.parse(localStorage.getItem('simple_tweet_registered_user'))
        }
        /* Parse all tweets from the local storage  */
        if (localStorage.getItem("simple_tweet_tweets")) {
            console.log("There is a list of tweets");
            this.tweets = JSON.parse(localStorage.getItem('simple_tweet_tweets'))

        } else {
            console.log("No tweets here");
        }
    }

});