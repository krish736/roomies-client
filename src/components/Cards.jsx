import React from "react";
import { Card } from "flowbite-react";
import { FaStar } from "react-icons/fa";

export default function Cards({ image, rating, title, address, description }) {
  return (
    <Card className="max-w-sm">
      <img
        src={image}
        alt="Meaningful image description"
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-5">
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={index < rating ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            ({rating}/5)
          </span>
        </div>

        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
          {title}
        </h5>
        <p className="font-medium text-gray-700 dark:text-gray-400">
          <span className="text-white">Address: </span>{address}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Card>
  );
}
