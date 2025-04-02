import React from "react";
import {
  ArrowRight,
  ChevronDown,
  BarChart2,
  Users,
  Rocket,
  Copy,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { TypeWriter } from "@/components/ui/type-writer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Transform = () => {
  const isDevelopment = window.location.hostname === "localhost";
  const isMainDomain =
    window.location.hostname === "alignify.net" ||
    window.location.hostname === "www.alignify.net";
  const isBetaDomain = window.location.hostname === "beta.alignify.net";
  const signinUrl = isMainDomain
    ? "https://alignify.net/auth/signin"
    : "/auth/signin";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <>
      <nav className="px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
        >
          Alignify
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="text-gray-300 hidden md:flex hover:text-white transition-colors"
          >
            Home
          </button>
          <a
            href="#features"
            className="text-gray-300 hidden md:flex hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#faq"
            className="text-gray-300 hidden md:flex hover:text-white transition-colors"
          >
            FAQ
          </a>
          <Link
            to={signinUrl}
            className="text-gray-300 hidden md:flex hover:text-white transition-colors"
          >
            Login
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to={signinUrl}
              className="md:hidden text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>

            <Button
              onClick={() =>
                document
                  .getElementById("signup-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <span className="hidden sm:inline">Join the Beta</span>
              <span className="sm:hidden">Join</span>
              <Rocket className="h-4 w-4" />
            </Button>
          </div>
          {/* <Button
            onClick={() =>
              document
                .getElementById("signup-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            Join the Beta
            <Rocket className="h-4 w-4" />
          </Button> */}
          {/* <Button
            onClick={() =>
              document
                .getElementById("signup-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span className="block md:hidden">Join</span>
            <span className="hidden md:block">Join the Beta</span>
            <Rocket className="h-4 w-4" />
          </Button> */}
        </div>
      </nav>
      {/* Transform Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12">
        <motion.div
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
        >
          <div className="space-y-2">
            <TypeWriter
              text="Bring your data"
              className="text-5xl font-bold tracking-normal"
            />
            <TypeWriter
              text="product ideas to life"
              className="text-5xl font-bold tracking-normal"
            />
          </div>
          <p className="text-gray-400 text-lg">
            Create professional dashboard wireframes using advanced
            visualizations and customizable templates. Perfect for both
            freelancers working with clients and organizations aligning multiple
            teams.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <Copy className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  Professional Templates
                </h3>
                <p className="text-gray-400">
                  Start with beautiful, customizable templates designed for data
                  storytelling
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <Share2 className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Easy Replication</h3>
                <p className="text-gray-400">
                  Clone and customize projects to maintain consistency across
                  your organization
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Seamless Sharing</h3>
                <p className="text-gray-400">
                  Collaborate with stakeholders and get faster approval on your
                  data stories
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur h-[400px] max-w-[500px] mx-auto lg:mx-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
          <div className="p-8">
            <p className="text-gray-400 text-center">
              Video Placeholder: Platform Overview
            </p>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Section */}
      <section id="features" className="py-24 bg-gray-900/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Alignify?</h2>
            <p className="text-gray-400">
              Save time and resources by getting alignment right the first time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <CardSpotlight className="p-8">
              <BarChart2 className="h-12 w-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">
                Interactive Wireframes
              </h3>
              <p className="text-gray-400">
                Create dynamic dashboard mockups that bring your data stories to
                life, replacing traditional whiteboards with analytics-focused
                tools
              </p>
            </CardSpotlight>

            <CardSpotlight className="p-8">
              <Users className="h-12 w-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">
                Real-time Collaboration
              </h3>
              <p className="text-gray-400">
                Enable analysts to focus on deep analysis while business teams
                easily communicate their desired outcomes
              </p>
            </CardSpotlight>

            <CardSpotlight className="p-8">
              <Rocket className="h-12 w-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Rapid Iteration</h3>
              <p className="text-gray-400">
                Eliminate endless feedback loops and reduce misunderstandings
                with clear visual communication
              </p>
            </CardSpotlight>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        id="faq"
        className="py-24"
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Everything you need to know about Alignify and how it can help
              your team
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-gray-800">
              <AccordionTrigger className="text-left">
                How is Alignify different from traditional wireframing tools?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Alignify is specifically designed for data visualization and
                analytics workflows, offering specialized components and
                templates that traditional wireframing tools lack.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-gray-800">
              <AccordionTrigger className="text-left">
                Can I collaborate with my team in real-time?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes, Alignify supports real-time collaboration, allowing team
                members to work together seamlessly on dashboard mockups.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-gray-800">
              <AccordionTrigger className="text-left">
                How does Alignify help reduce iteration cycles?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                By providing clear visual communication tools and templates,
                Alignify helps teams align on requirements early, reducing the
                need for multiple revision rounds.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-gray-800">
              <AccordionTrigger className="text-left">
                Can I use Alignify as a freelancer working with clients?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Absolutely! Alignify is perfect for freelancers who want to
                create professional dashboard mockups and collaborate
                effectively with clients.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-gray-800">
              <AccordionTrigger className="text-left">
                What kind of templates are available?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We offer a wide range of templates for different analytics use
                cases, including sales dashboards, marketing analytics, and
                operational metrics.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-gradient-to-br from-purple-900/50 to-purple-600/20"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Data Collaboration?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join teams who are saving countless hours and building stronger
            relationships through better data visualization alignment
          </p>
          <Button
            onClick={() =>
              document
                .getElementById("signup-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            size="lg"
            className="bg-white hover:bg-gray-100 text-purple-600 px-8 py-6 rounded-xl text-lg font-medium inline-flex items-center gap-2 transition-all hover:gap-3"
          >
            Join the Beta
            <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="text-gray-400 mt-4">
            Be among the first to experience Alignify
          </p>
        </div>
      </motion.section>
    </>
  );
};
