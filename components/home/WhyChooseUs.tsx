import { Card, CardContent } from '@/components/ui/card';
import { whyChooseUsFeatures } from '@/data/mockData';
import { Star, Truck, Shield, Headphones } from 'lucide-react';

const iconMap = {
  star: Star,
  truck: Truck,
  shield: Shield,
  headphones: Headphones,
};

export default function WhyChooseUs() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're committed to providing the best shopping experience with quality products and exceptional service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {whyChooseUsFeatures.map((feature) => {
          const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
          
          return (
            <Card key={feature.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}