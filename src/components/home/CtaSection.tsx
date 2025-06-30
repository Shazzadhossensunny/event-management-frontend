import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
      <div className="container">
        <div className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Event Experience?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers and attendees using EventHub to
            create memorable experiences
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="btn-secondary inline-flex items-center justify-center group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="/events"
              className="btn-outline bg-transparent border-white text-white hover:bg-white/20"
            >
              Browse Events
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "No credit card required",
                "Free forever plan",
                "Cancel anytime",
                "24/7 support",
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-white/90 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
