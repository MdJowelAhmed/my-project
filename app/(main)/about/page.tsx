import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Heart, Target, Mail } from 'lucide-react';

const stats = [
  { label: 'Happy Customers', value: '10,000+', icon: Users },
  { label: 'Products Sold', value: '50,000+', icon: Award },
  { label: 'Years in Business', value: '5+', icon: Heart },
  { label: 'Countries Served', value: '25+', icon: Target },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg',
    description: 'Passionate about creating exceptional shopping experiences.',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Technology',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    description: 'Leading our technical innovation and platform development.',
  },
  {
    name: 'Emily Davis',
    role: 'Customer Success Manager',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    description: 'Ensuring every customer has an amazing experience with us.',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">About EcomStore</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're more than just an e-commerce platform. We're your trusted partner in finding
            quality products, exceptional service, and building lasting relationships with our customers.
          </p>
        </div>

        {/* Hero Image and Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2019, EcomStore began with a simple mission: to make quality products
              accessible to everyone, everywhere. What started as a small team with big dreams
              has grown into a trusted e-commerce platform serving customers worldwide.
            </p>
            <p className="text-muted-foreground">
              We believe that shopping should be more than just a transaction. It should be an
              experience that delights, inspires, and adds value to your life. That's why we
              carefully curate every product, ensuring it meets our high standards for quality,
              design, and functionality.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Quality First</Badge>
              <Badge variant="secondary">Customer Focused</Badge>
              <Badge variant="secondary">Innovation</Badge>
              <Badge variant="secondary">Sustainability</Badge>
            </div>
          </div>
          <div
            className="aspect-video w-full bg-cover bg-center bg-no-repeat rounded-xl"
            style={{ backgroundImage: 'url(https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg)' }}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Values */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Quality & Authenticity</h3>
                <p className="text-muted-foreground">
                  We source only authentic, high-quality products from trusted manufacturers
                  and verified suppliers worldwide.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Customer First</h3>
                <p className="text-muted-foreground">
                  Every decision we make is centered around our customers' needs, satisfaction,
                  and long-term success.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Innovation & Growth</h3>
                <p className="text-muted-foreground">
                  We continuously improve our platform, services, and processes to provide
                  the best possible experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The passionate people behind EcomStore
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div
                    className="w-24 h-24 mx-auto bg-cover bg-center bg-no-repeat rounded-full"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 md:p-12 text-center text-white">
          <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Have questions or want to learn more about our mission? We'd love to hear from you.
          </p>
          <Button size="lg" variant="secondary">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}