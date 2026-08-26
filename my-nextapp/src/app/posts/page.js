'use client';

import { useEffect, useState } from 'react';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">ລາຍການ Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="my-2 p-3 border rounded">
          <h3>{post.title}</h3>
        </div>
      ))}
    </div>
  );
}