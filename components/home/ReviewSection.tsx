'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

// Mock Data for Reviews
const reviews = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Verified Buyer",
        rating: 5,
        avatar: "/avatars/alex.jpg",
        content: "Absolutely in love with the quality! The fabric is breathable and fits perfectly. Will definitely be buying more.",
        date: "2 days ago"
    },
    {
        id: 2,
        name: "Sarah Williams",
        role: "Fashion Enthusiast",
        rating: 5,
        avatar: "/avatars/sarah.jpg",
        content: "The delivery was super fast, and the packaging was premium. The shoes are even better in person!",
        date: "1 week ago"
    },
    {
        id: 3,
        name: "Michael Brown",
        role: "Athlete",
        rating: 4,
        avatar: "/avatars/michael.jpg",
        content: "Great gear for training. Durable and stylish. Took one star off because I wish there were more color options.",
        date: "2 weeks ago"
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Frequent Shopper",
        rating: 5,
        avatar: "/avatars/emily.jpg",
        content: "Customer service was incredibly helpful when I needed to exchange a size. The process was smooth and hassle-free.",
        date: "3 weeks ago"
    },
    {
        id: 5,
        name: "David Wilson",
        role: "Verified Buyer",
        rating: 5,
        avatar: "/avatars/david.jpg",
        content: "Best purchase I've made this year. The attention to detail is unmatched. Highly recommend!",
        date: "1 month ago"
    }
];

const ReviewSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, isAutoPlaying]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };

    const currentReview = reviews[currentIndex];

    // Variants for animations
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.9,
        })
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block p-2 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-2">
                        Testimonials
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Don't just take our word for it. Here's what our community has to say about their experience.
                    </p>
                </motion.div>

                {/* Review Carousel */}
                <div
                    className="relative max-w-4xl mx-auto h-[400px] md:h-[350px]"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <AnimatePresence initial={false} custom={direction} mode='wait'>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.2 }
                            }}
                            className="absolute inset-0 flex items-center justify-center p-4"
                        >
                            <Card className="w-full h-full bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 border-none rounded-2xl overflow-hidden relative">
                                {/* Decorative Quote Icon background */}
                                <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 pointer-events-none">
                                    <Quote size={200} />
                                </div>

                                <CardContent className="h-full flex flex-col md:flex-row items-center justify-center gap-8 p-8 md:p-12 relative z-10">
                                    {/* Left Side: User Info */}
                                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 min-w-[200px]">
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-purple-400">
                                                <Avatar className="w-full h-full border-4 border-white">
                                                    <AvatarImage src={currentReview.avatar} alt={currentReview.name} />
                                                    <AvatarFallback className="bg-gray-100 text-gray-500">
                                                        <User size={32} />
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                                                <div className="bg-green-500 rounded-full p-1">
                                                    <Quote fill="white" className="text-white w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{currentReview.name}</h3>
                                            <p className="text-sm text-primary font-medium">{currentReview.role}</p>
                                        </div>
                                    </div>

                                    {/* Vertical Divider (Desktop) */}
                                    <div className="hidden md:block w-px h-32 bg-gray-100"></div>

                                    {/* Right Side: Review Content */}
                                    <div className="flex-1 flex flex-col items-center md:items-start space-y-6">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < currentReview.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                                                />
                                            ))}
                                        </div>

                                        <blockquote className="text-xl md:text-2xl text-gray-700 italic font-medium leading-relaxed text-center md:text-left">
                                            "{currentReview.content}"
                                        </blockquote>

                                        <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                                            {currentReview.date}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-20">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-white shadow-lg hover:bg-gray-50 border-none h-12 w-12"
                            onClick={handlePrev}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                    </div>

                    <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-20">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-white shadow-lg hover:bg-gray-50 border-none h-12 w-12"
                            onClick={handleNext}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to review ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;