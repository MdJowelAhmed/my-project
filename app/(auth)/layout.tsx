import { Card, CardContent } from '@/components/ui/card';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">EC</span>
            </div>
            <span className="text-2xl font-bold">EcomStore</span>
          </div>
        </div>
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}