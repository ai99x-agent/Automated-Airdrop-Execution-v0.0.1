import requests
import tweepy

# Twitter API credentials (replace with your actual keys)
TWITTER_API_KEY = "your_twitter_api_key"
TWITTER_API_SECRET_KEY = "your_twitter_api_secret_key"
TWITTER_ACCESS_TOKEN = "your_twitter_access_token"
TWITTER_ACCESS_TOKEN_SECRET = "your_twitter_access_token_secret"

# Node.js API endpoint
NODE_API_ENDPOINT = "http://localhost:3000/ai99x"

# Initialize Tweepy API client
def initialize_twitter_client():
    auth = tweepy.OAuth1UserHandler(
        TWITTER_API_KEY, TWITTER_API_SECRET_KEY, 
        TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET
    )
    return tweepy.API(auth)

def fetch_comments(tweet_id):
    """Fetches comments (replies) for a given tweet ID."""
    api = initialize_twitter_client()
    comments = []

    try:
        for tweet in tweepy.Cursor(api.search_tweets, q=f"to:{tweet_id}", since_id=tweet_id, tweet_mode="extended").items():
            if hasattr(tweet, 'in_reply_to_status_id') and tweet.in_reply_to_status_id == tweet_id:
                comments.append(tweet.full_text)
    except Exception as e:
        print(f"Error fetching comments: {e}")

    return comments

def send_comments_to_node_api(comments):
    """Sends the fetched comments to the Node.js API."""
    try:
        response = requests.post(NODE_API_ENDPOINT, json={"comments": comments})
        if response.status_code == 200:
            print("Comments successfully sent to the Node.js API.")
        else:
            print(f"Failed to send comments. Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        print(f"Error sending comments to Node.js API: {e}")

if __name__ == "__main__":
    # Replace 'tweet_id_here' with the ID of the tweet you want to fetch comments for
    tweet_id = "tweet_id_here"

    # Fetch comments
    print("Fetching comments...")
    comments = fetch_comments(tweet_id)

    # Send comments to Node.js API
    if comments:
        print(f"Fetched {len(comments)} comments. Sending to Node.js API...")
        send_comments_to_node_api(comments)
    else:
        print("No comments found.")
