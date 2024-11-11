import React from "react";
import ContactCards from "../components/ContactCards";

export default function Contact() {
  const developers = {
    juned: {
      name: "Juned Choudhary",
      git: "#",
    },
    kartik: {
      name: "Kartik Pawar",
      git: "https://github.com/kartikpawar10",
    },
    krish: {
      name: "Krishnakant Dave",
      git: "https://github.com/krish736",
    },
    saif: {
      name: "Mohammed Saif",
      git: "#",
    },
  };

  return (
    <div className="mx-auto mt-5 max-w-screen-md text-center lg:mt-40">
      <h1 className="text-3xl mb-10">Developers of Roomies</h1>
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-5">
        {Object.entries(developers).map(([key, developer]) => (
          <ContactCards key={key} name={developer.name} git={developer.git} />
        ))}
      </div>
    </div>
  );
}
