import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [commentContent, setCommentContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('token');

  const fetchPost = () => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${id}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: commentContent }),
        }
      );

      if (response.ok) {
        setCommentContent('');
        fetchPost();
      } else {
        alert('Error submitting comment');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-emerald-500 mb-4"></div>
          <p className="text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors duration-200 mb-8"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to posts
        </Link>

        {/* Article */}
        <article className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-800">
            <span className="text-emerald-400 font-medium">
              {post.author.username}
            </span>
            <span className="text-gray-600">•</span>
            <time>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
              {post.content}
            </p>
          </div>
        </article>

        {/* Comments Section */}
        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-100 mb-6">
            Comments ({post.comments.length})
          </h3>

          {/* Comments List */}
          <div className="space-y-4 mb-8">
            {post.comments.length === 0 && (
              <p className="text-gray-400 text-center py-8">
                Be the first to comment.
              </p>
            )}
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 font-medium text-sm">
                    {comment.author.username}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          {token ? (
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-200">
                Leave a comment:
              </h4>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                required
                rows="4"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Share your thoughts..."
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-emerald-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-300">
                You must{' '}
                <Link
                  to="/login"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200"
                >
                  log in
                </Link>{' '}
                to comment.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PostDetail;
