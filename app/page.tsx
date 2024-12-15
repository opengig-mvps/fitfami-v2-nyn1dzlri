'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Star, Camera, Apple, User, ArrowRight, TrendingUp } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Discover & Share Delicious Recipes
                  </h1>
                  <p className="max-w-md text-md md:text-lg">
                    Join our community to explore and share amazing food recipes. Perfect for food lovers everywhere.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" className="h-10 px-8 text-sm font-medium">
                    Get Started
                  </Button>
                  <Button variant="outline" className="h-10 px-8 text-sm font-medium">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                  alt="Delicious Food"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold sm:text-4xl">Features</h2>
                <p className="max-w-xl text-md md:text-lg">
                  Our platform offers a variety of features to enhance your food sharing experience.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-center p-6 bg-purple-700">
                <Heart className="h-12 w-12 mb-4 text-purple-100" />
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Share with Love</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200">
                    Share your favorite recipes and photos with a vibrant community of food enthusiasts.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 bg-purple-700">
                <Camera className="h-12 w-12 mb-4 text-purple-100" />
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Capture Moments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200">
                    Capture and upload high-quality photos of your culinary creations.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 bg-purple-700">
                <Star className="h-12 w-12 mb-4 text-purple-100" />
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Top Recipes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200">
                    Discover top-rated recipes from chefs and home cooks around the world.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold sm:text-4xl">Join Our Community</h2>
                <p className="max-w-xl text-md md:text-lg">
                  Connect with other food lovers, share your culinary adventures, and get inspired.
                </p>
              </div>
              <Button variant="outline" className="h-10 px-8 text-sm font-medium">
                Sign Up Now
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold sm:text-4xl">Testimonials</h2>
                <p className="max-w-xl text-md md:text-lg">
                  Hear from our satisfied users about their experience with our platform.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-center p-6 bg-purple-700">
                <Avatar>
                  <AvatarImage src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardContent className="mt-4">
                  <p className="text-purple-200">
                    "This platform has completely transformed the way I share and discover recipes. It's a must-have for any food lover!"
                  </p>
                  <p className="mt-2 text-sm font-bold">John Doe, Chef</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 bg-purple-700">
                <Avatar>
                  <AvatarImage src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <CardContent className="mt-4">
                  <p className="text-purple-200">
                    "I love how easy it is to connect with other food enthusiasts and share my favorite recipes."
                  </p>
                  <p className="mt-2 text-sm font-bold">Sarah Miller, Home Cook</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 bg-purple-700">
                <Avatar>
                  <AvatarImage src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <CardContent className="mt-4">
                  <p className="text-purple-200">
                    "The community here is fantastic! I've learned so much and discovered so many new recipes."
                  </p>
                  <p className="mt-2 text-sm font-bold">Michael Johnson, Food Blogger</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold sm:text-4xl">Get the App</h2>
                <p className="max-w-xl text-md md:text-lg">
                  Download our app to enjoy all the features on your mobile device.
                </p>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="h-10 px-8 text-sm font-medium">
                  <Apple className="mr-2 h-4 w-4" /> App Store
                </Button>
                <Button variant="outline" className="h-10 px-8 text-sm font-medium">
                  <Camera className="mr-2 h-4 w-4" /> Google Play
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-purple-900 p-6 text-center text-sm">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            <div className="grid gap-1">
              <h3 className="font-semibold">Product</h3>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Security</a>
              <a href="#">Integrations</a>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Company</h3>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Resources</h3>
              <a href="#">Documentation</a>
              <a href="#">Help Center</a>
              <a href="#">Community</a>
              <a href="#">Templates</a>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Legal</h3>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;