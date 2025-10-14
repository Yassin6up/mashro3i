"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { 
  Sparkles,
  Search,
  Rocket
} from "lucide-react";

interface AnimatedGradientBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: 190 + Math.random() * 70,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
}

export function BeamsBackground({
    className,
    intensity = "strong",
}: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const MINIMUM_BEAMS = 20;

    const opacityMap = {
        subtle: 0.7,
        medium: 0.85,
        strong: 1,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            const totalBeams = MINIMUM_BEAMS * 1.5;
            beamsRef.current = Array.from({ length: totalBeams }, () =>
                createBeam(canvas.width, canvas.height)
            );
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function resetBeam(beam: Beam, index: number, totalBeams: number) {
            if (!canvas) return beam;
            
            const column = index % 3;
            const spacing = canvas.width / 3;

            beam.y = canvas.height + 100;
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 0.5 + Math.random() * 0.4;
            beam.hue = 190 + (index * 70) / totalBeams;
            beam.opacity = 0.2 + Math.random() * 0.1;
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            // Calculate pulsing opacity
            const pulsingOpacity =
                beam.opacity *
                (0.8 + Math.sin(beam.pulse) * 0.2) *
                opacityMap[intensity];

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

            // Enhanced gradient with multiple color stops
            gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
            gradient.addColorStop(
                0.1,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`
            );
            gradient.addColorStop(
                0.4,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`
            );
            gradient.addColorStop(
                0.6,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`
            );
            gradient.addColorStop(
                0.9,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`
            );
            gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "blur(35px)";

            const totalBeams = beamsRef.current.length;
            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                // Reset beam when it goes off screen
                if (beam.y + beam.length < -100) {
                    resetBeam(beam, index, totalBeams);
                }

                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [intensity]);

    return (
        <div
            className={cn(
                "relative min-h-screen w-full overflow-hidden bg-neutral-950",
                className
            )}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ filter: "blur(15px)" }}
            />

            <motion.div
                className="absolute inset-0 bg-neutral-950/5"
                animate={{
                    opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                }}
                style={{
                    backdropFilter: "blur(50px)",
                }}
            />

            <div className="relative z-10 flex h-screen w-full items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="text-center">
                        <motion.div 
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg mb-8 border border-white/20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Sparkles className="w-5 h-5" />
                            منصة المشاريع الرقمية الرائدة
                        </motion.div>
                        
                        <motion.h1 
                            className="md:text-6xl text-5xl my-1 font-black text-white leading-18 py-10 flex items-center gap-2 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            اكتشف أفضل
                            <span className="text-gradient block mt-2 mb-3 md:leading-[70px] leading-normal py-5 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">المشاريع الرقمية</span>
                        </motion.h1>
                        
                        <motion.p 
                            className="text-xl md:text-2xl text-white/80 mb-10 max-w-4xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            منصة متخصصة في بيع وشراء المشاريع الرقمية المربحة والتطبيقات والمواقع الإلكترونية.
                            <span className="text-white font-bold block mt-2">
                                اكتشف مشاريع تحقق عوائد شهرية مضمونة واستثمر في مستقبلك الرقمي
                            </span>
                        </motion.p>
                        
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Link href="/projects" className="px-8 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold rounded-full text-xl shadow-2xl hover:from-sky-500 hover:to-blue-600 hover:shadow-3xl hover:scale-110 active:scale-95 transition-all duration-300 inline-flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                <Search className="w-5 h-5 ml-4 relative z-10" />
                                <span className="relative z-10 text-base">تصفح المشاريع</span>
                            </Link>
                            <Link href="/register/seller" className="px-8 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-full text-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95 inline-flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                <Rocket className="w-5 h-5 ml-4 relative z-10" />
                                <span className="relative z-10 text-base">ابدأ البيع الآن</span>
                            </Link>
                        </motion.div>

                        {/* Floating Cards */}
                        <motion.div 
                            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <div className="text-3xl font-black text-white mb-2">+2K</div>
                                <div className="text-white/70">مشروع متاح</div>
                            </div>
                            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <div className="text-3xl font-black text-emerald-400 mb-2">98%</div>
                                <div className="text-white/70">رضا العملاء</div>
                            </div>
                            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <div className="text-3xl font-black text-blue-400 mb-2">24h</div>
                                <div className="text-white/70">زمن التسليم</div>
                            </div>
                            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <div className="text-3xl font-black text-purple-400 mb-2">$12M+</div>
                                <div className="text-white/70">قيمة المبيعات</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
