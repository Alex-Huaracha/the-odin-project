import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PostCard } from '../components/PostCard';
import { CreatePostForm } from '../components/CreatePostForm';
import { ArrowLeft } from 'lucide-react';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load the post.');
    } finally {
      setLoading(false);
    }
  }, [id]); // Only recreated if 'id' changes

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [fetchPost]); // Now fetchPost is a stable dependency

  const handleDelete = async (postIdToDelete) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;

    try {
      await axios.delete(`/api/posts/${postIdToDelete}`);

      if (postIdToDelete === post.id) {
        navigate('/');
      } else {
        setPost((prevPost) => ({
          ...prevPost,
          children: prevPost.children.filter(
            (comment) => comment.id !== postIdToDelete
          ),
        }));
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete the post');
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading thread... 🧵</div>;
  if (error || !post)
    return (
      <div className="p-8 text-center text-spotter-red">Post not found</div>
    );

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 bg-spotter-base/80 backdrop-blur-md border-b border-spotter-border px-4 py-3 z-10 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-spotter-dark rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-xl">Post</h1>
      </div>

      <PostCard post={post} onDelete={handleDelete} />

      <div className="border-b border-spotter-border">
        <CreatePostForm
          onPostCreated={fetchPost}
          parentId={post.id}
          placeholder="Post your reply"
        />
      </div>

      {post.children.length > 0 ? (
        post.children.map((comment) => (
          <PostCard key={comment.id} post={comment} onDelete={handleDelete} />
        ))
      ) : (
        <div className="p-8 text-center text-spotter-textGray text-sm">
          Be the first to reply 👇
        </div>
      )}
    </div>
  );
};

export default PostPage;
