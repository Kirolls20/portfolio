import { useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Send,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open WhatsApp with pre-filled message
    const message = `Hi! I'm ${formData.name}.\n\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/201017349046?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/201017349046", "_blank");
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 space-y-12">
          <div
            className={`text-center space-y-4 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Drop me a line
              and let's create something amazing!
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Contact Info */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {[
                  {
                    href: "mailto:kirollssabri666@gmail.com",
                    icon: Mail,
                    title: "Email",
                    info: "kirollssabri666@gmail.com",
                    color: "primary",
                  },
                  {
                    href: "tel:+201017349046",
                    icon: Phone,
                    title: "Phone",
                    info: "+20 101 734 9046",
                    color: "secondary",
                  },
                  {
                    href: null,
                    icon: MapPin,
                    title: "Location",
                    info: "Cairo, Egypt",
                    color: "accent",
                  },
                ].map((contact, index) => {
                  const Icon = contact.icon;
                  const Component = contact.href ? "a" : "div";
                  const props = contact.href
                    ? {
                        href: contact.href,
                        target: contact.href.startsWith("http")
                          ? "_blank"
                          : undefined,
                        rel: contact.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined,
                      }
                    : {};

                  return (
                    <Component
                      key={index}
                      {...props}
                      className={`glass-panel rounded-2xl p-6 flex items-center gap-4 hover:scale-[1.02] transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-${
                        contact.color
                      }/20 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{
                        transitionDelay: `${200 + index * 100}ms`,
                      }}
                    >
                      <div
                        className={`p-3 rounded-xl bg-${contact.color}/10 group-hover:bg-${contact.color}/20 transition-colors`}
                      >
                        <Icon className={`w-6 h-6 text-${contact.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold mb-1">{contact.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.info}
                        </p>
                      </div>
                    </Component>
                  );
                })}
              </div>

              {/* WhatsApp CTA */}
              <div
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <Button
                  onClick={openWhatsApp}
                  size="lg"
                  className="w-full gap-3 group relative bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-6 text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#25D366]/30"
                >
                  <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span className="relative z-10 font-semibold">
                    Chat on WhatsApp
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </div>

              {/* Social Links */}
              <div
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 text-center">
                  Connect With Me
                </h3>
                <div className="flex gap-3 justify-center">
                  {[
                    {
                      href: "https://github.com",
                      icon: Github,
                      label: "GitHub",
                      color: "hover:text-[#333] dark:hover:text-white",
                    },
                    {
                      href: "https://linkedin.com",
                      icon: Linkedin,
                      label: "LinkedIn",
                      color: "hover:text-[#0A66C2]",
                    },
                    {
                      href: "https://twitter.com",
                      icon: Twitter,
                      label: "Twitter",
                      color: "hover:text-[#1DA1F2]",
                    },
                  ].map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="rounded-full hover:scale-110 transition-all duration-300 group relative h-12 w-12"
                      asChild
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <social.icon
                          className={`w-5 h-5 transition-colors ${social.color}`}
                        />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-background px-2 py-1 rounded whitespace-nowrap">
                          {social.label}
                        </span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div
              className={`transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="glass-panel rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-primary" />
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl border-border/50 focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-primary" />
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl border-border/50 focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-primary" />
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="rounded-xl border-border/50 focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2 group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Send via WhatsApp
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div
            className={`text-center pt-8 border-t border-border/50 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Kirolls Sabri. Built with ❤️ using
              React & TypeScript.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
