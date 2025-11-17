import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { Mail, Phone, MapPin, Linkedin, Github, Code2, Database, Server, Brain, CheckCircle2, Calendar, Building2, Menu, X, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      const errorMessage = error?.message || error?.error || "Please try again later.";
      toast({
        title: "Failed to send message",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "skills", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills = {
    languages: [
      { name: "Java" },
      { name: "Python" },
      { name: "SQL" },
      { name: "JavaScript" },
    ],
    frameworks: [
      { name: "Spring Boot" },
      { name: "PyTorch" },
      { name: "OpenCV" },
      { name: "Angular" },
      { name: "JUnit" },
      { name: "Docker" },
      { name: "WSO2" },
      { name: "Jenkins" },
    ],
    databases: [
      { name: "PostgreSQL" },
      { name: "CouchDB" },
      { name: "MySQL" },
    ],
    architectures: [
      { name: "Microservices" },
      { name: "Event-driven" },
      { name: "Multitenancy" },
      { name: "REST APIs" },
    ],
    devops: [
      { name: "Kubernetes" },
      { name: "RabbitMQ" },
      { name: "Redis" },
      { name: "Postman" },
      { name: "Metabase" },
    ],
    specialized: [
      { name: "Computer Vision (YOLOv8, ONNX)" },
      { name: "Geospatial Systems (GNSS, IMU)" },
      { name: "Kalman Filter" },
      { name: "Edge AI (Jetson)" },
    ],
    soft: [
      { name: "Agile Development" },
      { name: "Leadership" },
      { name: "Cross-team Collaboration" },
      { name: "Problem-solving" },
    ],
  };

  const projects = [
    {
      title: "Geospatial AI & Edge Vision System",
      description: "Delivered a 60 FPS object detection pipeline using YOLOv8, ZED 2i stereo cameras, Kalman filtering, and Jetson for real-time road inspections with 95%+ detection precision.",
      tech: ["YOLOv8", "ZED 2i", "Jetson", "GNSS/IMU", "Kalman Filter", "ONNX"],
      featured: true,
    },
    {
      title: "App Builder Platform",
      description: "Enabled users to build fully functional apps via UI by dynamically generating SQL and CouchDB schemas, reducing delivery time by 70%. Integrated analytics using Metabase.",
      tech: ["Spring Boot", "PostgreSQL", "CouchDB", "Metabase", "Angular"],
    },
    {
      title: "Planner Board",
      description: "Created a high-throughput backend capable of serving 8,000+ records across multiple sheets with millisecond response time.",
      tech: ["Java", "PostgreSQL", "Microservices", "REST APIs"],
    },
    {
      title: "Document Management System",
      description: "Built scalable backend handling 10,000+ documents/day with version control and tenant isolation.",
      tech: ["Spring Boot", "PostgreSQL", "Multitenancy", "RBAC"],
    },
    {
      title: "Ezy Serve API Layer",
      description: "Built a reusable, no-code API engine that eliminated 90% of custom query work across backend modules.",
      tech: ["Java", "Spring Boot", "Dynamic SQL", "REST APIs"],
    },
  ];

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-xl font-bold text-foreground hover-elevate active-elevate-2 px-3 py-1 rounded-md transition-colors"
              data-testid="button-home"
            >
              Karthik Attooru
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { id: "about", label: "About" },
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
                { id: "skills", label: "Skills" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className={activeSection === item.id ? "bg-accent" : ""}
                  data-testid={`button-nav-${item.id}`}
                >
                  {item.label}
                </Button>
              ))}
              <Separator orientation="vertical" className="h-6 mx-2" />
              <Button
                variant="ghost"
                size="icon"
                asChild
                data-testid="button-linkedin"
              >
                <a href="https://www.linkedin.com/in/karthik-attooru" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-2">
                {[
                  { id: "about", label: "About" },
                  { id: "experience", label: "Experience" },
                  { id: "projects", label: "Projects" },
                  { id: "skills", label: "Skills" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => scrollToSection(item.id)}
                    className="justify-start"
                    data-testid={`button-nav-mobile-${item.id}`}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight" data-testid="text-hero-name">
                  Karthik Attooru
                </h1>
                <p className="text-2xl md:text-3xl font-semibold text-primary" data-testid="text-hero-title">
                  Software Engineer | Full-Stack | Backend | Computer Vision
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl" data-testid="text-hero-description">
                  Innovative Software Engineer with 4+ years of hands-on experience in designing, developing, and deploying high-performance, scalable applications. Proven ability to drive end-to-end system architecture and implement AI-powered solutions.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild data-testid="button-linkedin-hero">
                  <a href="https://www.linkedin.com/in/karthik-attooru" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")} data-testid="button-contact-hero">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
                <a href="mailto:karthikredd157@gmail.com" className="flex items-center gap-2 hover-elevate px-2 py-1 rounded-md transition-colors" data-testid="link-email">
                  <Mail className="h-4 w-4" />
                  karthikredd157@gmail.com
                </a>
                <a href="tel:+917780692080" className="flex items-center gap-2 hover-elevate px-2 py-1 rounded-md transition-colors" data-testid="link-phone">
                  <Phone className="h-4 w-4" />
                  +91-7780692080
                </a>
                <span className="flex items-center gap-2" data-testid="text-location">
                  <MapPin className="h-4 w-4" />
                  Bangalore, India
                </span>
              </div>
            </div>

            <div className="lg:w-2/5">
              <div className="relative">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border">
                  <Code2 className="h-32 w-32 text-primary opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 border-t">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center" data-testid="text-about-heading">About Me</h2>
          
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground mb-12">
            <p data-testid="text-about-p1">
              As an innovative Software Engineer with over 4 years of experience, I specialize in designing and deploying high-performance, scalable applications that drive real-world impact. My expertise spans full-stack development, backend systems, and cutting-edge AI technologies including Computer Vision and Geospatial AI.
            </p>
            <p data-testid="text-about-p2">
              At Saartha Labs, I&apos;ve led the development of groundbreaking systems including a real-time Geospatial AI platform with {'>'}95% detection precision, a drag-and-drop App Builder that reduced delivery time by 70%, and microservices supporting 100+ SaaS tenants. My work has reduced manual inspection labor by 200+ man-hours per month through AI-powered automation.
            </p>
            <p data-testid="text-about-p3">
              I&apos;m passionate about building scalable architectures, implementing innovative solutions, and leading cross-functional teams to deliver production-grade software in fast-paced environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center" data-testid="card-metric-years">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary" data-testid="text-metric-years">4+</CardTitle>
                <CardDescription>Years Experience</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center" data-testid="card-metric-projects">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary" data-testid="text-metric-projects">5+</CardTitle>
                <CardDescription>Major Projects</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center" data-testid="card-metric-technologies">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary" data-testid="text-metric-technologies">25+</CardTitle>
                <CardDescription>Technologies Mastered</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 border-t">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center" data-testid="text-experience-heading">Professional Experience</h2>
          
          <Card data-testid="card-experience">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl" data-testid="text-company">Saartha Labs Pvt Ltd</CardTitle>
                    <CardDescription className="text-base" data-testid="text-location-company">Bangalore, India</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span data-testid="text-duration">March 2021 – Present</span>
                </div>
              </div>
              <p className="text-lg font-medium text-primary" data-testid="text-role">Software Engineer</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  "Developed a real-time Geospatial AI platform integrating YOLOv8, ZED 2i stereo cameras, and GNSS/IMU sensors, enabling automated road infrastructure mapping with >95% detection precision.",
                  "Designed a drag-and-drop App Builder that dynamically generated SQL schemas and APIs, reducing delivery time by 70% and enabling non-developers to build workflows.",
                  "Engineered microservices-based systems for Authorization, Task Scheduling, and Document Management, supporting multi-tenancy and RBAC.",
                  "Built a generic dynamic read service with pagination, filtering, and sorting, enabling support for 100+ SaaS tenants.",
                  "Led CI/CD setup using Jenkins, Docker, and SonarQube, improving deployment from 2 hours to 30 minutes.",
                  "Integrated Metabase for real-time analytics, boosting operational visibility by 3×.",
                  "Reduced manual inspection labor by 200+ man-hours/month through AI-powered object detection pipelines on Jetson edge devices.",
                ].map((achievement, index) => (
                  <li key={index} className="flex gap-3 text-foreground" data-testid={`text-achievement-${index}`}>
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 border-t">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center" data-testid="text-projects-heading">Project Highlights</h2>
          
          <div className="space-y-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`hover-elevate transition-all ${project.featured ? 'border-primary' : ''}`}
                data-testid={`card-project-${index}`}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl md:text-2xl mb-2" data-testid={`text-project-title-${index}`}>
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed" data-testid={`text-project-description-${index}`}>
                        {project.description}
                      </CardDescription>
                    </div>
                    {project.featured && (
                      <Badge variant="default" className="w-fit" data-testid="badge-featured">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm" data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 border-t">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center" data-testid="text-skills-heading">Core Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Languages", items: skills.languages, key: "languages" },
              { title: "Frameworks & Tools", items: skills.frameworks, key: "frameworks" },
              { title: "Databases", items: skills.databases, key: "databases" },
              { title: "Architectures", items: skills.architectures, key: "architectures" },
              { title: "DevOps & Tools", items: skills.devops, key: "devops" },
              { title: "Specialized Domains", items: skills.specialized, key: "specialized" },
              { title: "Soft Skills", items: skills.soft, key: "soft" },
            ].map((category) => (
              <Card key={category.key} data-testid={`card-skill-category-${category.key}`}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold" data-testid={`text-skill-category-${category.key}`}>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <Badge 
                        key={skill.name} 
                        variant="outline" 
                        className="px-4 py-2 text-sm"
                        data-testid={`badge-skill-${skill.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 border-t">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center" data-testid="text-education-heading">Education</h2>
          
          <Card className="max-w-2xl mx-auto" data-testid="card-education">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl" data-testid="text-degree">
                Bachelor of Technology (B.Tech)
              </CardTitle>
              <CardDescription className="text-base" data-testid="text-field">
                Mechanical Engineering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-muted-foreground">
                <p data-testid="text-institution">Siddhartha Institute of Engineering & Technology</p>
                <p data-testid="text-year">2020</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 border-t">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center" data-testid="text-contact-heading">Get In Touch</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Send me a message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message..." 
                            className="min-h-[120px] resize-none" 
                            {...field} 
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={contactMutation.isPending} data-testid="button-submit">
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <a 
                  href="mailto:karthikredd157@gmail.com" 
                  className="flex items-center gap-4 p-4 rounded-md hover-elevate active-elevate-2 transition-colors group"
                  data-testid="link-email-contact"
                >
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">karthikredd157@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="tel:+917780692080" 
                  className="flex items-center gap-4 p-4 rounded-md hover-elevate active-elevate-2 transition-colors group"
                  data-testid="link-phone-contact"
                >
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+91-7780692080</p>
                  </div>
                </a>

                <a 
                  href="https://www.linkedin.com/in/karthik-attooru" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-md hover-elevate active-elevate-2 transition-colors group"
                  data-testid="link-linkedin-contact"
                >
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Linkedin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Connect with me</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-md">
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground" data-testid="text-location-contact">Bangalore, India</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Response time:</span> I typically respond within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Karthik Attooru</h3>
              <p className="text-sm text-muted-foreground">
                Software Engineer passionate about building scalable systems and AI-powered solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <div className="flex flex-col gap-2">
                {[
                  { id: "about", label: "About" },
                  { id: "experience", label: "Experience" },
                  { id: "projects", label: "Projects" },
                  { id: "skills", label: "Skills" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm text-muted-foreground hover:text-foreground text-left hover-elevate w-fit px-2 py-1 rounded-md transition-colors"
                    data-testid={`button-footer-${item.id}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Connect</h3>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" asChild data-testid="button-footer-linkedin">
                  <a href="https://www.linkedin.com/in/karthik-attooru" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild data-testid="button-footer-email">
                  <a href="mailto:karthikredd157@gmail.com">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <Separator className="mb-6" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p data-testid="text-copyright">© 2025 Karthik Attooru. All rights reserved.</p>
            <p className="flex items-center gap-1" data-testid="text-tech-credit">
              Built with <Code2 className="h-4 w-4 mx-1" /> React + Node.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
