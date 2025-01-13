import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Affirmations = () => {
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch an affirmation
  const fetchAffirmation = async () => {
    setLoading(true);

    try {
      const response = await axios.get("https://www.affirmations.dev/");
      setAffirmation(response.data.affirmation);
    } catch (error) {
      console.error("Error fetching affirmation:", error);
      setAffirmation("You are capable, strong, and enough. 🌟"); // Fallback message
    }
    setLoading(false);
  };

  // Fetch an affirmation when the component mounts
  useEffect(() => {
    fetchAffirmation();

    // Fetch a new affirmation every 2 hours
    const interval = setInterval(() => {
      fetchAffirmation();
    }, 2 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row justify-center items-center space-x-4 text-white text-lg">
      <button onClick={fetchAffirmation}>
        <Image src={"/lotus1.gif"} alt="lotus" width={50} height={50} />
      </button>

      <p className="sm:block hidden">
        {loading ? "Breathe in... Breathe out..." : affirmation}
      </p>
    </div>
  );
};

export default Affirmations;
