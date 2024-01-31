"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function SearchInputCard() {
  const [inputValue, setInputValue] = useState("");
  const [githubUsers, setGithubUsers] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const searchGitUsers = async (username) => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${username}&sort=followers`
      );
      const { items: data = [] } = await response.json();
      data?.length && data?.length !== 0
        ? setGithubUsers(data)
        : setGithubUsers([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchGitUsers(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, 500]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-5 mb-3 p-0">
        <h1 className="text-2xl font-medium text-center uppercase">
          Search Github Users
        </h1>
        <input
          className="rounded border text-stone-900 outline-none p-2 border-stone-500"
          onChange={handleInputChange}
          value={inputValue}
          placeholder="Search github user by name"
        />
      </div>
      <div className="flex flex-col gap-3">
        {githubUsers?.map((item, key) => (
          <div key={key?.toString()} className="flex gap-3 p-3 border rounded ">
            <div className="w-auto h-auto">
              <Image
                src={item?.avatar_url}
                width={25}
                height={25}
                alt="github user"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col justify-between gap-2">
              <h2 className="text-stone-900 text-base">{item?.login}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchInputCard;
