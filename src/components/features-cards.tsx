import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Share, Code, Users, LucideProps } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
}) => (
  <Card className="h-full border border-indigo-800">
    <CardHeader>
      <Icon className="h-8 w-8 text-primary mb-2" />
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{description}</CardContent>
  </Card>
);

const FeaturesCards = () => {
  const features = [
    {
      icon: Video,
      title: "Video Calls",
      description:
        "Connect face-to-face with developers around the world for real-time collaboration and problem-solving.",
    },
    {
      icon: Share,
      title: "Screen Sharing",
      description:
        "Share your screen to get instant feedback on your code or demonstrate issues you're facing.",
    },
    {
      icon: Code,
      title: "Code Collaboration",
      description:
        "Work together on code in real-time, making pair programming and code reviews a breeze.",
    },
    {
      icon: Users,
      title: "Developer Community",
      description:
        "Join a thriving community of developers eager to help and learn from each other.",
    },
  ];

  return (
    <section className="py-16 dark:bg-gray-900 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCards;
