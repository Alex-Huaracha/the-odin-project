import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-emerald-500 mb-4"></div>
          <p className="text-gray-400">Loading the best fitness content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-linear-to-b from-gray-900 to-gray-950 border-b border-gray-800 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Gym Blog 🏋️‍♂️
          </h1>
          <p className="text-gray-400 text-lg">Science and sweat.</p>
        </div>
      </header>

      {/* Posts Grid */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/10"
            >
              <h2 className="text-2xl font-bold text-gray-100 mb-3 hover:text-emerald-400 transition-colors duration-200">
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h2>

              <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <span className="text-emerald-400 font-medium">
                    {post.author.username}
                  </span>
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

              <p className="text-gray-300 mb-4 leading-relaxed">
                {post.content.substring(0, 150)}...
              </p>

              <Link
                to={`/posts/${post.id}`}
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200"
              >
                Read full article
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No posts yet. Be the first to share!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
