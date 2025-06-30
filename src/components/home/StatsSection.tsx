import { TrendingUp, Users, Calendar, MapPin } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: <Calendar className="w-8 h-8" />,
      number: "10,000+",
      label: "Events Created",
      description: "Successfully organized events",
      color: "from-primary-500 to-primary-600",
    },
    {
      id: 2,
      icon: <Users className="w-8 h-8" />,
      number: "50,000+",
      label: "Active Users",
      description: "Registered members worldwide",
      color: "from-secondary-500 to-secondary-600",
    },
    {
      id: 3,
      icon: <MapPin className="w-8 h-8" />,
      number: "100+",
      label: "Cities Covered",
      description: "Events across the globe",
      color: "from-accent-500 to-accent-600",
    },
    {
      id: 4,
      icon: <TrendingUp className="w-8 h-8" />,
      number: "98%",
      label: "Satisfaction Rate",
      description: "Happy users and organizers",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Event Enthusiasts</span>{" "}
            Worldwide
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Join thousands of users who have made EventHub their go-to platform
            for event management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="text-center group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <div className="text-white">{stat.icon}</div>
              </div>

              {/* Number */}
              <div className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">
                {stat.number}
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 dark:text-neutral-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Ready to Create Your Next Event?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Join our community and start organizing amazing events today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="btn-primary">
                Get Started Free
              </a>
              <a href="/events" className="btn-outline">
                Browse Events
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
