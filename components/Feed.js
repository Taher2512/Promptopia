"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => (
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
    ))}
  </div>
);

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
    };

    fetchPosts();
  }, []);

  // Filter posts based on search text
  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredPosts(filtered);
  }, [searchText, posts]);

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  return (
    <section className="feed">
      <form className="relative w-full content-center">
        <input
          type="text"
          placeholder="Search for a tag / username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
