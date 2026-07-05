import { 
  FaUsers, 
  FaRocket, 
  FaLock, 
  FaTrophy,
  FaHandshake,
  FaLightbulb,
  FaShieldAlt,
  FaStar
} from "react-icons/fa";

interface ValueType {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function AboutOurValues() {
  const values: ValueType[] = [
    {
      title: "Community First",
      description: "We believe in building strong, supportive communities where every player feels valued and heard. Our platform is designed to foster connections and collaboration among guild members.",
      icon: <FaUsers className="h-8 w-8 text-orange-500" />
    },
    {
      title: "Innovation & Growth",
      description: "We continuously evolve our platform to meet the changing needs of the Albion Online community. We embrace new ideas and technologies to provide the best guild management experience.",
      icon: <FaRocket className="h-8 w-8 text-orange-500" />
    },
    {
      title: "Transparency & Trust",
      description: "We operate with complete transparency, ensuring our users have full visibility into how their data is managed. Trust is the foundation of every relationship we build.",
      icon: <FaLock className="h-8 w-8 text-orange-500" />
    },
    {
      title: "Excellence in Gaming",
      description: "We are committed to excellence in everything we do, from our platform's performance to the support we provide. We strive to enhance the gaming experience for all players.",
      icon: <FaTrophy className="h-8 w-8 text-orange-500" />
    }
  ];

  return (
    <section className="py-10 md:py-16 bg-muted/80">
      <div className="max-w-7xl w-[95%] mx-auto">
        
        
        {/* Section Header */}
        <div className="text-center md:text-start max-w-3xl mb-5 md:mb-8">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Values
          </h2>
          <p className="text-lg text-muted-foreground">
            The principles that guide everything we do at Albion Game Guild Management Platform
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {values.map((item, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 hover:border-orange-500/30"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.07] to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col gap-4">
                {/* Icon with background */}
                <div className="bg-orange-500/10 p-3 rounded-xl w-fit">
                  {item.icon}
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative number */}
                <div className="absolute top-4 right-4 text-sm font-bold text-muted-foreground/20">
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}