import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  // Handle kasus ketika ProjectLink kosong
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };


  return (
      <div className="group relative w-full">


        <div className="relative z-10 bg-gradient-to-br from-slate-200/60 to-purple-200/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-purple-400/40 h-full flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 via-purple-300/30 to-pink-200/30 opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          <div className="relative p-5 z-10">
            <div className="relative overflow-hidden rounded-lg">
              <img
                  src={Img}
                  alt={Title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="mt-4 space-y-3">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
                {Title}
              </h3>

              <p className="text-gray-800/80 text-sm leading-relaxed line-clamp-2">
                {Description}
              </p>

              <div className="pt-4 flex items-center justify-between">
                {ProjectLink ? (
                    <a
                        href={ProjectLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLiveDemo}
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-500 transition-colors duration-200"
                    >
                      <span className="text-sm font-medium">Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                ) : (
                    <span className="text-gray-500 text-sm">Demo Not Available</span>
                )}



                {id ? (
                    <Link
                        to={`/project/${id}`}
                        onClick={handleDetails}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/40 hover:bg-white/20 text-gray-800/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                      <span className="text-sm font-medium">Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                ) : (
                    <span className="text-gray-500 text-sm">Details Not Available</span>
                )}
              </div>
            </div>

            <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
          </div>
        </div>
      </div>
  );
};

export default CardProject;