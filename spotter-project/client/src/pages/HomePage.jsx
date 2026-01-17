import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreatePostForm } from '../components/CreatePostForm';
import { PostCard } from '../components/PostCard';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load posts
  const fetchPosts = async () => {
    try {
      setError(null);
      const res = await axios.get('/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      setError('Error loading the feed. Are you logged in?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to delete posts (passed to the card)
  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((p) => p.id !== postId));
    } catch (error) {
      alert('Could not delete the post');
    }
  };

  return (
    <div className="text-spotter-text min-h-screen pb-20">
      {/* Fixed Header */}
      <div
        className="sticky top-0 bg-spotter-base/80 backdrop-blur-md border-b border-spotter-border p-4 z-10 cursor-pointer"
        onClick={() => window.scrollTo(0, 0)}
      >
        <h1 className="font-bold text-xl">Home</h1>
      </div>

      {/* Create Post Form */}
      <CreatePostForm onPostCreated={fetchPosts} />

      {/* Posts List */}
      {loading ? (
        <div className="p-8 text-center text-spotter-textGray">
          Loading muscles... 💪
        </div>
      ) : error ? (
        <div className="p-8 text-center text-spotter-red">{error}</div>
      ) : posts.length === 0 ? (
        <div className="p-8 text-center">
          <p className="font-bold text-xl mb-2">Your feed is empty 🦗</p>
          <p className="text-spotter-textGray">
            Write your first post or follow someone.
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
        ))
      )}
    </div>
  );
};

export default HomePage;
