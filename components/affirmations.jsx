import axios from "axios";
import React, { useState, useEffect } from "react";
import { RiRestartLine } from "react-icons/ri";

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
    }, 2 * 60 * 60 * 1000); // 2 hours

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="text-white text-lg flex items-center">
      {/* Refresh Button */}
      <button className="hover:text-black mr-2" onClick={fetchAffirmation}>
        <RiRestartLine />
      </button>

      {/* Show Loading or Affirmation */}
      {loading ? <p>Loading...</p> : <p className="mr-8">{affirmation}</p>}
    </div>
  );
};

export default Affirmations;
