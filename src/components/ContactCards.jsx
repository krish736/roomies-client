import React from "react";
import { Card } from "flowbite-react";

export default function ContactCards({ name, git }) {
  return (
    <Card className="min-w-64">
      <div className="flex flex-col items-center pb-10 ">
        <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Web Developer
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <a
            href={git}
            target="_blank"
            rel="noopener noreferrer"
          >
            Git Profile
          </a>
        </div>
      </div>
    </Card>
  );
}
