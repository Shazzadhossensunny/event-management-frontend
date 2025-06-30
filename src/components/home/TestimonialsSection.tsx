import {
  Star,
  Quote,
  User,
  Calendar,
  Users,
  MapPin,
  Heart,
  Shield,
  Plus,
  Zap,
  ArrowRight,
  Search,
  Filter,
  Bell,
  TrendingUp,
} from "lucide-react";

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Event Organizer",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      content:
        "EventHub has transformed how I organize events. The interface is intuitive and the features are exactly what I need. My events are more successful than ever!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Community Manager",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      content:
        "The community features are incredible. We've doubled attendance at our monthly meetups since switching to EventHub.",
      rating: 5,
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Marketing Director",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      content:
        "The analytics and reporting tools helped us understand our audience better. We've improved event satisfaction by 40%!",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Users Say</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their event
            experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card p-8 group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-neutral-300 dark:text-neutral-700"
                    }`}
                  />
                ))}
              </div>

              <Quote className="w-8 h-8 text-primary-500 mb-4 opacity-20" />
              <p className="text-neutral-600 dark:text-neutral-400 italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TestimonialsSection;
