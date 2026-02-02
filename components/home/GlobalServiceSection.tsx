'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function GlobalServiceSection() {
    return (
        <section className="relative bg-gradient-to-b from-background via-background/95 to-background py-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Global Service Coverage
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                        >
                            We provide our services to clients worldwide, spanning across all continents.
                            From North America to Asia, Europe to Africa, and everywhere in between -
                            we`re here to help your business succeed globally.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="grid grid-cols-2 gap-6 pt-4"
                        >
                            <div className="space-y-2">
                                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    150+
                                </div>
                                <div className="text-sm text-muted-foreground">Countries Served</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    24/7
                                </div>
                                <div className="text-sm text-muted-foreground">Global Support</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                                    1000+
                                </div>
                                <div className="text-sm text-muted-foreground">Happy Clients</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
                                    99.9%
                                </div>
                                <div className="text-sm text-muted-foreground">Uptime SLA</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Globe / 3D Map Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-[600px] aspect-square">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl" />

                            {/* 3D World Image */}
                            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-2 ring-blue-500/30">
                                <Image
                                    src="/assets/download.jpg"
                                    alt="3D world map showing global service coverage"
                                    width={1000}
                                    height={1000}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
