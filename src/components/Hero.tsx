import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 animate-fade-up">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Welcome to Your Modern React Application
        </h1>
        <p className="text-xl text-gray-600">
          Build something amazing with React, Tailwind CSS, and modern web technologies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-all flex items-center gap-2 group">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-3 border border-gray-300 rounded-lg hover:border-primary transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;