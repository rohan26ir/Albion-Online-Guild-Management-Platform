import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { TbFileLike } from "react-icons/tb";

import image from '@/public/assets/background/ao-login.webp'

interface CountType {
  title?: string;
  number?: string;
  icon?: React.ReactNode;
}

export default function AboutOurStory() {
  const counts: CountType[] = [
    { title: "Player Satisfaction Rate", number: "4.9/5", icon: <TbFileLike /> },
    { title: "Happy Players", number: "1000+", icon: <FaCheckCircle /> },
    // { title: "Active Guilds", number: "50+", icon: <FaUsers /> },
    // { title: "Events Hosted", number: "200+", icon: <FaTrophy /> },
  ];

  return (
    <section className="">
      <div className="max-w-7xl w-[95%] mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-12 items-center">


          {/* Left - Content */}
          <div className="flex-1 space-y-4  md:space-y-6">
            
            {/* Badge
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
              <FaRocket className="h-4 w-4" />
              About Us
            </div> */}

            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Our Story
              </h2>
              
            </div>

            <div className="space-y-1 md:space-y-4 text-muted-foreground leading-relaxed max-w-lg">
              <p>
                We started with a simple mission: to make guild management in Albion Online 
                easier and more efficient. Our platform helps guild leaders organize their 
                members, track progress, and build stronger communities.
              </p>
              <p>
                {"From humble beginnings, we've grown into a comprehensive solution that thousands of players trust to manage their guilds and coordinate events."}
              </p>
            </div>

            {/* Count Stats */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {counts.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 bg-card p-4 rounded-xl  ">
                  <div className="text-3xl text-orange-500">
                    {item.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {item.number}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image/Visual */}
          <div className="flex-1 rounded-2xl h-40 md:h-100 mt-auto w-full overflow-hidden ">
            <Image 
             src={image}
             alt="Our Story"
             className="object-cover hover:scale-125 w-full h-full overflow-hidden  duration-700 transform " 
             />
          </div>
          

        </div>
      </div>
    </section>
  );
}