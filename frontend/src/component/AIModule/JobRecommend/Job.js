import React, { useState } from "react";

export default function Job() {
  const [skills, setSkills] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills }),
      });

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-blue-500 mb-8">
        AI Job Recommendation System
      </h1>

      <form
        onSubmit={handleSubmit}
        className=" p-6 rounded-lg shadow-lg w-full max-w-lg border border-blue-500"
      >
        <label htmlFor="skills" className="block text-lg mb-2 text-blue-400">
          Enter your skills:
        </label>
        <input
          type="text"
          id="skills"
          name="skills"
          placeholder="e.g., Python, Data Science, Machine Learning"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-3  text-white border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full mt-4 py-3 text-lg bg-blue-500 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-600"
        >
          {loading ? "Processing..." : "Get Job Recommendations"}
        </button>
      </form>

      {recommendations.length > 0 && (
        <div className="mt-8 p-6 rounded-lg shadow-lg max-w-lg w-full border border-blue-400 glass-effect">
          <h2 className="text-2xl font-bold text-blue-400">
            Recommended Jobs:
          </h2>
          <ul className="mt-4">
            {recommendations.map((job, index) => (
              <li
                key={index}
                className="py-2 px-4 border-b border-gray-700 last:border-none"
              >
                {job}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
