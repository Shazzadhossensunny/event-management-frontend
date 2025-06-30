import { Calendar, Heart, MapPin, Shield, Users, Zap } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white dark:bg-neutral-900">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              About <span className="gradient-text">EventHub</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              Founded in 2023, EventHub was born from a simple idea: make event
              management accessible to everyone. Whether you're organizing a
              small book club or a large conference, we provide the tools you
              need.
            </p>

            <div className="space-y-6">
              <div className="flex">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-2">
                    Our Mission
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Connect people through memorable events and simplify the
                    event creation process.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-2">
                    Security First
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    We prioritize your data security with industry-leading
                    encryption and privacy practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="card p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-neutral-800 dark:to-neutral-800/50">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-neutral-900 dark:text-neutral-100">
                50,000+ Users
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Growing community of event enthusiasts
              </p>
            </div>

            <div className="card p-6 bg-gradient-to-br from-secondary-50 to-accent-50 dark:from-neutral-800 dark:to-neutral-800/50">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-neutral-900 dark:text-neutral-100">
                100+ Cities
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Events happening worldwide
              </p>
            </div>

            <div className="card p-6 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-neutral-800 dark:to-neutral-800/50">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-neutral-900 dark:text-neutral-100">
                10,000+ Events
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Created and managed through our platform
              </p>
            </div>

            <div className="card p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-800 dark:to-neutral-800/50">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-neutral-900 dark:text-neutral-100">
                24/7 Support
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Dedicated team ready to help
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
