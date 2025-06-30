import {
  Search,
  Plus,
  Users,
  Filter,
  Bell,
  Shield,
  Calendar,
  MapPin,
  Star,
  Zap,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: <Search className="w-8 h-8" />,
      title: "Smart Search",
      description:
        "Find events that match your interests with our intelligent search and filtering system.",
      color: "from-primary-500 to-primary-600",
    },
    {
      id: 2,
      icon: <Plus className="w-8 h-8" />,
      title: "Easy Event Creation",
      description:
        "Create and manage your events with our intuitive interface and powerful tools.",
      color: "from-secondary-500 to-secondary-600",
    },
    {
      id: 3,
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description:
        "Join a vibrant community of event organizers and attendees from around the world.",
      color: "from-accent-500 to-accent-600",
    },
    {
      id: 4,
      icon: <Filter className="w-8 h-8" />,
      title: "Advanced Filtering",
      description:
        "Filter events by date, location, category, and more to find exactly what you're looking for.",
      color: "from-green-500 to-green-600",
    },
    {
      id: 5,
      icon: <Bell className="w-8 h-8" />,
      title: "Real-time Updates",
      description:
        "Get instant notifications about event updates, new attendees, and important changes.",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 6,
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description:
        "Your data is protected with enterprise-grade security and reliable infrastructure.",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const highlights = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Calendar Integration",
      description: "Sync with your favorite calendar apps",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location-Based Discovery",
      description: "Find events happening near you",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Event Ratings & Reviews",
      description: "Read reviews from other attendees",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Notifications",
      description: "Never miss an important update",
    },
  ];

  return (
    <section className="py-20 bg-white/50 dark:bg-neutral-900/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Manage Events</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Powerful features designed to make event management simple,
            efficient, and enjoyable
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="card p-8 group hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                {feature.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlights Section */}
        <div className="glass rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">
              Why Choose EventHub?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Built with modern technology and user experience in mind
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-lg hover:bg-white/20 dark:hover:bg-neutral-800/20 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="text-white">{highlight.icon}</div>
                </div>
                <h4 className="font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                  {highlight.title}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
