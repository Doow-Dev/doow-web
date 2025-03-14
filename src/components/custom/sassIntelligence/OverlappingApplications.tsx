'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { AppImages } from '@/lib/config/app-images';
import { cn } from '@/lib/utils';

interface Application{
  name: string;
  logo: string
  spend: number;
  users: string[];
}
interface ApplicationCardProps {
  id: string;
  depth: number;
  maxDepth: number;
  apps: Application[];
  hoveredCardId: string | null;
  onHover: (id: string | null) => void;
}

const RecursiveApplicationCard: React.FC<ApplicationCardProps> = ({ 
  id,
  depth,
  maxDepth, 
  apps,
  hoveredCardId,
  onHover 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse event handling logic 
  useEffect(() => {
    const cardElement = cardRef.current;
    
    const handleMouseOver = (e: MouseEvent) => {
      e.stopPropagation();
      
      if (e.target === cardElement || (cardElement?.contains(e.target as Node))) {
        if (hoveredCardId !== id) {
          onHover(id);
        }
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      if (hoveredCardId === id) {
        if (e.relatedTarget === null || !cardElement?.contains(e.relatedTarget as Node)) {
          onHover(null);
        }
      }
    };

    if (cardElement) {
      cardElement.addEventListener('mouseover', handleMouseOver);
      cardElement.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener('mouseover', handleMouseOver);
        cardElement.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, [id, onHover, hoveredCardId]);

  // Base case: Stop recursion at maximum depth
  if (depth > maxDepth) return null;

  // Map depth to corresponding class names
  const baseDepthClassMap: { [key: number]: string } = {
    1: "lg:col-span-4 lg:grid-cols-4",
    2: "lg:col-span-3 lg:grid-cols-3",
    3: "lg:col-span-2 lg:grid-cols-2",
    4: "lg:col-span-1 lg:grid-cols-1",
  }

  // Adjust the depthClassMap based on maxDepth
  const adjustedDepthClassMap: { [key: number]: string } = {};
  for (let i = 1; i <= maxDepth; i++) {
      adjustedDepthClassMap[i] = baseDepthClassMap[i + (4 - maxDepth)];
  }

  // Get a progressively smaller subset of apps based on depth
  const appsForThisLevel = apps.slice(0, apps.length - depth + 1)
  const currentApp = apps[0]
  
  // Title changes based on depth
  const cardTitle = depth === maxDepth ? 'Isolated spend' : 'Overlapping spend';

  return (
    <Card 
      ref={cardRef}
      className={cn("lg:flex gap-2 lg:gap-4 items-center p-3 lg:p-4 duration-300 transform max-w-full border-2 rounded-2xl transition-all",hoveredCardId === id ? "shadow-[0px_4px_10px_rgba(0,0,0,0.15)]" : ""
      )}
      data-id={id}
    >
       <CardContent className="p-2 flex flex-col gap-2">
          <div className='flex items-center justify-between w-full gap-6'>
            <div className='w-full'>
              <p className=" text-xs sm:text-sm text-doow_grey">{cardTitle}</p>
              <p className="text-base sm:text-xl font-bold">${currentApp.spend.toLocaleString()}</p>
            </div>
            <div className="flex items-center max-w-fit">
              <div className="flex -space-x-2">
                {appsForThisLevel.map((app, i) => 
                  <Avatar key={i} className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-background">
                    <AvatarImage src={app.logo} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="inline-flex items-center rounded-md">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {
              currentApp.users.map((user, i) => 
              <Avatar key={i} className="w-5 h-5 sm:w-7 sm:h-7 border-2 border-background">
                <AvatarImage src={user} className='object-cover' />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            )}
          </div>

          <p className="text-xs sm:text-sm text-gray-500">
            {currentApp.users.length} {hoveredCardId === id && (cardTitle === 'Overlapping spend' ? 'overlapping' : 'unique' )} users
          </p>
       </CardContent>

      {/* Recursive child - only render if haven't reached maxDepth */}
      {depth < maxDepth && (
        <div 
          className="nested-card-container"
          onClick={e => e.stopPropagation()}
        >
          <RecursiveApplicationCard
            id={appsForThisLevel[appsForThisLevel.length - 1]?.name || `level-${depth + 1}`}
            depth={depth + 1}
            maxDepth={maxDepth}
            apps={apps}
            hoveredCardId={hoveredCardId}
            onHover={onHover}
          />
        </div>
      )}
    </Card>
  );
};

const OverlappingApplications: React.FC = () => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  
  // Handler to update which card is currently hovered
  const handleCardHover = (id: string | null) => {
    setHoveredCardId(id);
  };
  
  const apps: Application[] = [
    {
      name: 'Notion',
      logo: AppImages.logos.notion,
      spend: 9000,
      users: [
        AppImages.profiles.afro, AppImages.profiles.aiony, AppImages.profiles.anthony,
        AppImages.profiles.ayo, AppImages.profiles.joseph, AppImages.profiles.jurica, AppImages.profiles.lucas,
        AppImages.profiles.lupita, AppImages.profiles.mathias, AppImages.profiles.micheal, AppImages.profiles.prince,
      ]
    },
    {
      name: 'Slack',
      logo: AppImages.logos.slack,
      spend: 7500,
      users: [
        AppImages.profiles.afro, AppImages.profiles.aiony, AppImages.profiles.anthony,
        AppImages.profiles.ayo, AppImages.profiles.joseph, AppImages.profiles.jurica, AppImages.profiles.lucas,
        AppImages.profiles.lupita, AppImages.profiles.mathias, AppImages.profiles.micheal, AppImages.profiles.prince,
      ]
    },
    {
      name: 'Teams',
      logo: AppImages.logos.teams,
      spend: 5000,
      users: [
        AppImages.profiles.afro, AppImages.profiles.aiony, AppImages.profiles.anthony,
        AppImages.profiles.ayo, AppImages.profiles.joseph, AppImages.profiles.jurica, AppImages.profiles.lucas,
        AppImages.profiles.lupita, AppImages.profiles.mathias, AppImages.profiles.micheal, AppImages.profiles.prince,
      ]
    },
    {
      name: 'Zoom',
      logo: AppImages.logos.zoom,
      spend: 3000,
      users: [
        AppImages.profiles.afro, AppImages.profiles.aiony, AppImages.profiles.anthony,
        AppImages.profiles.ayo, AppImages.profiles.joseph, AppImages.profiles.jurica, AppImages.profiles.lucas,
        AppImages.profiles.lupita, AppImages.profiles.mathias, AppImages.profiles.micheal, AppImages.profiles.prince,
      ]
    }
  ];

  // Calculate max depth based on number of apps (with a maximum of 4)
  const maxDepth = Math.min(apps.length, 4);

  return (
    <div className="flex flex-col p-3 sm:p-4 w-full max-w-full bg-white/80 rounded-2xl shadow-lg">
      {/* tabs */}
      <div className="flex justify-between items-center p-4 overflow-x-auto gap-4 sm:gap-10 mb-4 whitespace-nowrap ">
        {apps.map((app, idx) => 
          <div key={idx} className='flex justify-between items-center rounded-md border-2 px-2 sm:px-4 py-1 sm:py-2 flex-shrink-0 min-w-[150px] sm:min-w-[200px] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.09)]'>
            <div className='flex justify-between items-center'>
              <div
                className="flex min-w-fit items-center justify-center mr-2 bg-white"
              >
                <Image 
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={20}
                  height={20}
                  className="border border-white sm:w-[30px] sm:h-[30px] w-[20px] h-[20px]"
                />
              </div>
              <p className='text-xs sm:text-sm font-semibold capitalize'>{app.name}</p>
            </div>
            <div className="inline-flex items-center rounded-md">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>

      {/* Start recursive rendering with the top-level card */}
      <RecursiveApplicationCard 
        id={apps[0].name}
        depth={1}
        maxDepth={maxDepth}
        apps={apps}
        hoveredCardId={hoveredCardId} 
        onHover={handleCardHover}
      />
    </div>
  );
};

export default OverlappingApplications;