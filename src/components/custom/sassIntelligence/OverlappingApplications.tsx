'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown } from 'lucide-react';
import { AppImages } from '@/lib/config/app-images';

const ApplicationCard = ({ 
  id, // Unique identifier for each card
  apps, 
  spend, 
  userCount, 
  children,
  hoveredCardId,
  onHover 
}: { 
  id: string;
  apps: {name: string, logo: string}[];
  spend: number;
  userCount: number;
  children?: React.ReactNode;
  hoveredCardId: string | null;
  onHover: (id: string | null) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;

    const handleMouseEnter = () => {
      onHover(id);
    };

    const handleMouseLeave = () => {
      onHover(null);
    };

    if (cardElement) {
      cardElement.addEventListener('mouseenter', handleMouseEnter);
      cardElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener('mouseenter', handleMouseEnter);
        cardElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [id, onHover]);

  const renderUserBlocks = () => {
    return Array.from({ length: userCount }).map((_, i) => (
      <Avatar key={i} className="w-4 h-4 bg-coral-100">
        <AvatarImage src={AppImages.logos.zoom} />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    ));
  };

  return (
    <Card 
      ref={cardRef}
      className={`flex min-w-fit p-4 border rounded-3xl transition-all relative ${
        hoveredCardId === id ? 'ring-2 ring-doow_primary backdrop-blur shadow-doow_primary shadow-md' : ''
      }`}
    >
      <div className="space-y-6 pr-4 my-auto">
        <div className=' flex items-center justify-between'>
          <div className=''>
            <p className="text-sm text-gray-500">Overlapping spend</p>
            <p className="text-xl font-bold">${spend.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex -space-x-2">
              {apps.map((app, i) => 
                <Avatar key={i} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={app.logo} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              )}
            </div>
            <button className="inline-flex items-center rounded-md hover:bg-accent hover:text-accent-foreground p-1">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {renderUserBlocks()}
        </div>

        <p className="text-sm text-gray-500">{userCount} users</p>
      </div>

      {children && (
        <div>
          {children}
        </div>
      )}
    </Card>
  );
};

export const OverlappingApplications = () => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
   const apps = [
    {name: 'slack', logo: AppImages.logos.slack},
    {name: 'teams', logo: AppImages.logos.teams},
    {name: 'zoom', logo: AppImages.logos.zoom},
    {name: 'notion', logo: AppImages.logos.notion},
   ]

  return (
    <div className="p-4 overflow-auto">
      <ApplicationCard 
        id="notion" 
        apps={apps}
        spend={9000} 
        userCount={30} 
        hoveredCardId={hoveredCardId} 
        onHover={setHoveredCardId}
      >
        <ApplicationCard 
          id="zoom" 
          apps={apps.slice(0, 3)}
          spend={9000} 
          userCount={30} 
          hoveredCardId={hoveredCardId} 
          onHover={setHoveredCardId}
        >
          <ApplicationCard 
            id="teams" 
            apps={apps.slice(0, 2)}
            spend={9000} 
            userCount={30} 
            hoveredCardId={hoveredCardId} 
            onHover={setHoveredCardId}
          >
            <ApplicationCard 
              id="slack" 
              apps={apps.slice(0, 1)} 
              spend={9000} 
              userCount={30} 
              hoveredCardId={hoveredCardId} 
              onHover={setHoveredCardId}
            />
          </ApplicationCard>
        </ApplicationCard>
      </ApplicationCard>
    </div>
  );
};