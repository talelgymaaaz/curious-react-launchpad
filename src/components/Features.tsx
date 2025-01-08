import { Code, Layout, Zap } from "lucide-react";

const features = [
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Responsive Design",
    description: "Looks great on any device, from mobile to desktop.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Performance",
    description: "Optimized for speed and smooth user experience.",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Modern Stack",
    description: "Built with React, Tailwind CSS, and TypeScript.",
  },
];

const Features = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;