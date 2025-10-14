"use client"
import React, { useEffect, useState, memo } from 'react';
import { cn } from "@/lib/utils"

// --- Type Definitions ---
type LogoType = 'logo1' | 'logo2' | 'logo3' | 'logo4';

type GlowColor = 'blue' | 'emerald' | 'purple' | 'amber';

interface LogoProps {
  type: LogoType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  logoType: LogoType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

export interface OrbitingCirclesProps {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
}

// --- Logo Components ---
const logoComponents: Record<LogoType, { src: string; color: string }> = {
  logo1: {
    src: '/logo1.png',
    color: '#3B82F6' // Blue
  },
  logo2: {
    src: '/logo2.png',
    color: '#10B981' // Emerald
  },
  logo3: {
    src: '/logo3.png',
    color: '#8B5CF6' // Purple
  },
  logo4: {
    src: '/logo4.png',
    color: '#F59E0B' // Amber
  }
};

// --- Memoized Logo Component ---
const LogoComponent = memo(({ type }: LogoProps) => {
  const logoData = logoComponents[type];
  return logoData ? (
    <img 
      src={logoData.src} 
      alt={`${type} logo`}
      className="w-full h-full object-contain rounded-3xl"
    />
  ) : null;
});
LogoComponent.displayName = 'LogoComponent';

// --- Configuration for the Orbiting Logos (Desktop) ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit
  { 
    id: 'logo1',
    orbitRadius: 120, 
    size: 120, 
    speed: 1, 
    logoType: 'logo1', 
    phaseShift: 0, 
    glowColor: 'blue',
    label: 'حلول البرمجيات'
  },
  { 
    id: 'logo2',
    orbitRadius: 120, 
    size: 120, 
    speed: 1, 
    logoType: 'logo2', 
    phaseShift: Math.PI, 
    glowColor: 'emerald',
    label: 'إدارة المشاريع'
  },
  // Outer Orbit
  { 
    id: 'logo3',
    orbitRadius: 200, 
    size: 140, 
    speed: -0.7, 
    logoType: 'logo3', 
    phaseShift: 0, 
    glowColor: 'purple',
    label: 'الحلول المحاسبية'
  },
  { 
    id: 'logo4',
    orbitRadius: 200, 
    size: 140, 
    speed: -0.7, 
    logoType: 'logo4', 
    phaseShift: Math.PI, 
    glowColor: 'amber',
    label: 'ذكاء اصطناعي'
  },
];

// --- Memoized Orbiting Logo Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, logoType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125' : ''}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${logoComponents[logoType]?.color}40, 0 0 60px ${logoComponents[logoType]?.color}20`
            : undefined
        }}
      >
        <LogoComponent type={logoType} />
      
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'blue', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    blue: {
      primary: 'rgba(59, 130, 246, 0.4)',
      secondary: 'rgba(59, 130, 246, 0.2)',
      border: 'rgba(59, 130, 246, 0.3)'
    },
    emerald: {
        primary: 'rgba(59, 130, 246, 0.4)',
        secondary: 'rgba(59, 130, 246, 0.2)',
        border: 'rgba(59, 130, 246, 0.3)'
    },
    purple: {
        primary: 'rgba(59, 130, 246, 0.4)',
        secondary: 'rgba(59, 130, 246, 0.2)',
        border: 'rgba(59, 130, 246, 0.3)'
    },
    amber: {
        primary: 'rgba(59, 130, 246, 0.4)',
        secondary: 'rgba(59, 130, 246, 0.2)',
        border: 'rgba(59, 130, 246, 0.3)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.blue;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: ``,
          boxShadow: ``,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `0.1px solid #00000010 `,
          boxShadow: ``,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingCircles() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Responsive configurations
  const getResponsiveConfig = () => {
    if (isMobile) {
      return {
        skillsConfig: [
          { 
            id: 'logo1',
            orbitRadius: 60, 
            size: 50, 
            speed: 1, 
            logoType: 'logo1' as LogoType, 
            phaseShift: 0, 
            glowColor: 'blue' as GlowColor,
            label: 'حلول البرمجيات'
          },
          { 
            id: 'logo2',
            orbitRadius: 60, 
            size: 50, 
            speed: 1, 
            logoType: 'logo2' as LogoType, 
            phaseShift: Math.PI, 
            glowColor: 'emerald' as GlowColor,
            label: 'إدارة المشاريع'
          },
          { 
            id: 'logo3',
            orbitRadius: 100, 
            size: 60, 
            speed: -0.7, 
            logoType: 'logo3' as LogoType, 
            phaseShift: 0, 
            glowColor: 'purple' as GlowColor,
            label: 'الحلول المحاسبية'
          },
          { 
            id: 'logo4',
            orbitRadius: 100, 
            size: 60, 
            speed: -0.7, 
            logoType: 'logo4' as LogoType, 
            phaseShift: Math.PI, 
            glowColor: 'amber' as GlowColor,
            label: 'ذكاء اصطناعي'
          },
        ],
        orbitConfigs: [
          { radius: 60, glowColor: 'blue' as GlowColor, delay: 0 },
          { radius: 100, glowColor: 'purple' as GlowColor, delay: 1.5 }
        ]
      };
    }
    
    return {
      skillsConfig,
      orbitConfigs: [
        { radius: 120, glowColor: 'blue' as GlowColor, delay: 0 },
        { radius: 200, glowColor: 'purple' as GlowColor, delay: 1.5 }
      ]
    };
  };

  const { skillsConfig: currentSkillsConfig, orbitConfigs } = getResponsiveConfig();

  return (
    <main className="w-full flex items-center justify-center ">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          // style={{
          //   backgroundImage: `radial-gradient(circle at 25% 25%, #374151 0%, transparent 50%),
          //                    radial-gradient(circle at 75% 75%, #4B5563 0%, transparent 50%)`,
          // }}
        />
      </div>

      <div 
        className="relative w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] flex items-center justify-center mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central Logo with enhanced glow */}
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center z-10 relative shadow-2xl border-2 border-[#00000025]">
          <div className="absolute inset-0 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10 p-1 sm:p-2">
            <h1 className='text-sm sm:text-2xl font-bold'>عملاءنا</h1>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting skill icons */}
        {currentSkillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </main>
  );
}

// --- Original OrbitingCircles component for backward compatibility ---
export function OrbitingCirclesComponent({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      <div
        style={
          {
            "--duration": duration,
            "--radius": radius,
            "--delay": -delay,
          } as React.CSSProperties
        }
        className={cn(
          "absolute flex transform-gpu animate-orbit items-center justify-center rounded-full border bg-black/10 [animation-delay:calc(var(--delay)*1000ms)] dark:bg-white/10",
          { "[animation-direction:reverse]": reverse },
          className,
        )}
      >
        {children}
      </div>
    </>
  )
}
