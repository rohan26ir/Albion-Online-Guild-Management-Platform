import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconSword, IconPlus as Plus } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import bgwar from '@/public/assets/background/war.webp'

interface FAQItemType {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  categories: Record<string, string>;
  faqData: Record<string, FAQItemType[]>;
  className?: string;
}

interface FAQHeaderProps {
  title: string;
  subtitle: string;
}

interface FAQTabsProps {
  categories: Record<string, string>;
  selected: string;
  setSelected: (key: string) => void;
}

interface FAQListProps {
  faqData: Record<string, FAQItemType[]>;
  selected: string;
}

interface FAQItemComponentProps {
  question: string;
  answer: string;
}

// Main reusable FAQ component
export const FAQ: React.FC<FAQProps> = ({
  title = "FAQs",
  subtitle = "Frequently Asked Questions",
  categories,
  faqData,
  className,
  ...props
}) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryKeys[0]);

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-background/40 px-4 py-12 text-foreground",
        className
      )}
      {...props}
    >

      <div className="absolute inset-0 -z-10 brightness-75">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70" /> */}
        <Image
          src={bgwar}
          alt="Albion Online Background"
          fill
          className="object-cover brightness-35"
          priority
        />
      </div>

      <div className='max-w-7xl w-[95%] mx-auto z-10 '>
        <FAQHeader title={title} subtitle={subtitle} />
        <FAQTabs
          categories={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <FAQList
          faqData={faqData}
          selected={selectedCategory}
        />
      </div>
    </section>
  );
};

const FAQHeader: React.FC<FAQHeaderProps> = ({ title, subtitle }) => (
  <div className="relative z-10 flex flex-col items-center justify-center">



    <div className="flex justify-center">
      <div className="rounded-lg border px-4 py-1 font-mono flex items-center gap-2">
        <IconSword className="size-3" />
        <span>{subtitle}</span>
      </div>
    </div>
    <h2 className="my-5 text-center text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">
      {title}
    </h2>

    <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl" />
  </div>
);

const FAQTabs: React.FC<FAQTabsProps> = ({ categories, selected, setSelected }) => (
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setSelected(key)}
        className={cn(
          "relative overflow-hidden whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-medium transition-colors duration-500",
          selected === key
            ? "border-primary text-background"
            : "border-border bg-transparent text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="relative z-10">{label}</span>
        <AnimatePresence>
          {selected === key && (
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: "backIn" }}
              className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-primary/80"
            />
          )}
        </AnimatePresence>
      </button>
    ))}
  </div>
);

const FAQList: React.FC<FAQListProps> = ({ faqData, selected }) => (
  <div className="mx-auto mt-12 max-w-3xl">
    <AnimatePresence mode="wait">
      {Object.entries(faqData).map(([category, questions]) => {
        if (selected === category) {
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "backIn" }}
              className="space-y-4"
            >
              {questions.map((faq: FAQItemType, index: number) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </motion.div>
          );
        }
        return null;
      })}
    </AnimatePresence>
  </div>
);

const FAQItem: React.FC<FAQItemComponentProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "rounded-xl border transition-colors",
        isOpen ? "bg-muted/50" : "bg-card"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <span
          className={cn(
            "text-lg font-medium transition-colors",
            isOpen ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: { rotate: "45deg" },
            closed: { rotate: "0deg" },
          }}
          transition={{ duration: 0.2 }}
        >
          <Plus
            className={cn(
              "h-5 w-5 transition-colors",
              isOpen ? "text-foreground" : "text-muted-foreground"
            )}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : "0px",
          marginBottom: isOpen ? "16px" : "0px"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-4"
      >
        <p className="text-muted-foreground">{answer}</p>
      </motion.div>
    </motion.div>
  );
};