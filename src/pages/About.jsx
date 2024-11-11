import React from 'react'
import { Avatar, Blockquote } from "flowbite-react";

export default function About() {
  return (
    <figure className="mx-auto mt-5 max-w-screen-md text-center lg:mt-40 p-4">
      <svg
        className="mx-auto mb-3 h-10 w-10 text-gray-400 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 14"
      >
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
      </svg>
      <Blockquote>
        <p className="text-2xl font-medium italic text-gray-900 dark:text-white">
          "Welcome to Roomie! This is our final-year major project built using
          the MERN stack. This is a team effort project that we are proud of. 
          Roomie is an app designed for young people who are moving to new places and face the challenge of finding a place to live and good roommates. We hope
          this app helps fellow youngsters like us!"
        </p>
      </Blockquote>
    </figure>
  );
}
