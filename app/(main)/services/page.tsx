import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Palette, Server, Globe, CheckCircle } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'UI/UX Design',
    description: 'Create stunning, user-friendly interfaces that engage and convert visitors into customers.',
    icon: Palette,
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design & Branding',
      'Responsive Design',
      'Usability Testing',
    ],
    price: 'From $500',
  },
  {
    id: 2,
    title: 'Frontend Development',
    description: 'Build fast, responsive, and interactive web applications using modern technologies.',
    icon: Code,
    features: [
      'React/Next.js Development',
      'Responsive Web Design',
      'Performance Optimization',
      'Cross-browser Compatibility',
      'Progressive Web Apps',
    ],
    price: 'From $800',
  },
  {
    id: 3,
    title: 'Backend Development',
    description: 'Develop robust server-side applications with secure APIs and database integration.',
    icon: Server,
    features: [
      'RESTful API Development',
      'Database Design & Integration',
      'Authentication & Security',
      'Payment Gateway Integration',
      'Cloud Deployment',
    ],
    price: 'From $1000',
  },
  {
    id: 4,
    title: 'Domain & Hosting Setup',
    description: 'Complete domain registration and hosting setup with ongoing maintenance and support.',
    icon: Globe,
    features: [
      'Domain Registration',
      'SSL Certificate Setup',
      'Cloud Hosting Configuration',
      'CDN Integration',
      'Ongoing Maintenance',
    ],
    price: 'From $200',
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive web development solutions to help your business succeed online.
            From design to deployment, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            
            return (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <Button>Get Started</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your requirements and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}