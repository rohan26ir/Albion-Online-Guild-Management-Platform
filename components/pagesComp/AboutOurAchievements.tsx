// components/pagesComp/AboutOurAchievements.tsx
import { FaTrophy, FaUsers, FaCalendarCheck, FaCode, FaRocket } from "react-icons/fa";

interface Achievement {
  number: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export default function AboutOurAchievements() {
  const achievements: Achievement[] = [
    {
      number: "1000+",
      label: "Happy Players",
      icon: <FaUsers className="h-8 w-8 text-orange-500" />,
      description: "Players trust our platform for their guild management needs"
    },
    {
      number: "50+",
      label: "Active Guilds",
      icon: <FaTrophy className="h-8 w-8 text-orange-500" />,
      description: "Guilds actively using our platform daily"
    },
    {
      number: "200+",
      label: "Events Hosted",
      icon: <FaCalendarCheck className="h-8 w-8 text-orange-500" />,
      description: "Guild events organized through our platform"
    },
    {
      number: "4.9/5",
      label: "Satisfaction Rate",
      icon: <FaRocket className="h-8 w-8 text-orange-500" />,
      description: "Average rating from our community members"
    }
  ];

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl w-[95%] mx-auto">
       
       
        <div className="text-center max-w-3xl mx-auto mb-4 md:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1">
            Our Achievements
          </h2>
          <p className="text-lg text-muted-foreground">
            Milestones that reflect our commitment to the Albion Online community
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="text-center bg-card border border-border rounded-xl p-2 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-orange-500/30 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-3">
                <div className="bg-orange-500/10 p-3 rounded-xl">
                  {item.icon}
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {item.number}
              </div>
              <p className="text-sm font-medium text-foreground mb-2">
                {item.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}