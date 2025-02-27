'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown } from 'lucide-react';
import { AppImages } from '@/lib/config/app-images';
import Image from 'next/image';

const ApplicationCard = ({ 
  id,
  apps, 
  spend, 
  title,
  users, 
  children,
  hoveredCardId,
  onHover 
}: { 
  id: string;
  apps: {name: string, logo: string}[];
  spend: number;
  title: string;
  users: string[];
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

  return (
    <Card 
      ref={cardRef}
      className={`flex min-w-fit p-4 border rounded-3xl transition-all relative ${
        hoveredCardId === id ? 'ring-2 ring-doow_primary backdrop-blur shadow-doow_primary shadow-md' : ''
      }`}
    >
      <div className="space-y-6 pr-4 my-auto">
        <div className='flex items-center justify-between w-full gap-6'>
          <div className='w-full '>
            <p className="text-sm text-doow_grey">{title}</p>
            <p className="text-xl font-bold">${spend.toLocaleString()}</p>
          </div>
          <div className="flex items-center max-w-fit">
            <div className="flex -space-x-2">
              {apps.map((app, i) => 
                <Avatar key={i} className="h-6 w-6 border-2 border-background">
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
            users.map((user, i) => 
            <Avatar key={i} className="w-7 h-7 border-2 border-background">
              <AvatarImage src={user} className='object-cover' />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          )}
        </div>

        <p className="text-sm text-gray-500">{users.length} {hoveredCardId === id && title === 'Overlapping spend' && `Overlapping` } users</p>
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
    {name: 'notion', logo: AppImages.logos.notion},
    {name: 'slack', logo: AppImages.logos.slack},
    {name: 'teams', logo: AppImages.logos.teams},
    {name: 'zoom', logo: AppImages.logos.zoom},
   ]

   const users = [
    AppImages.profiles.afro, AppImages.profiles.aiony, AppImages.profiles.anthony,
    AppImages.profiles.ayo, AppImages.profiles.joseph, AppImages.profiles.jurica, AppImages.profiles.lucas,
    AppImages.profiles.lupita, AppImages.profiles.mathias, AppImages.profiles.micheal, AppImages.profiles.prince,
  ]

  return (
    <div className="p-4 overflow-auto w-full max-w-full bg-white rounded-2xl">
      {/* tabs */}
      <div className="flex justify-between items-center gap-10 mb-4 w-full overflow-auto whitespace-nowrap">
        {apps.map((app, idx) => 
          <div key={idx} className='flex justify-between items-center rounded-md border-2 px-4 py-2 flex-shrink-0 min-w-[200px]'>
            <div className='flex justify-between items-center'>
              <div
                className="flex min-w-fit items-center justify-center mr-2 bg-white"
              >
                <Image 
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={30}
                  height={30}
                  className="border border-white"
                />
              </div>
              <p className='text-sm font-semibold capitalize'>{app.name}</p>
            </div>
            <div className="inline-flex items-center rounded-md">
                  <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>

      {/* Application cards */}
      <ApplicationCard 
        id="notion" 
        apps={apps}
        spend={9000} 
        title='Overlapping spend'
        users={users} 
        hoveredCardId={hoveredCardId} 
        onHover={setHoveredCardId}
      >
        <ApplicationCard 
          id="zoom" 
          apps={apps.slice(0, 3)}
          spend={9000} 
          title='Overlapping spend'
          users={users} 
          hoveredCardId={hoveredCardId} 
          onHover={setHoveredCardId}
        >
          <ApplicationCard 
            id="teams" 
            apps={apps.slice(0, 2)}
            spend={9000} 
            title='Overlapping spend'
            users={users} 
            hoveredCardId={hoveredCardId} 
            onHover={setHoveredCardId}
          >
            <ApplicationCard 
              id="slack" 
              apps={apps.slice(0, 1)} 
              spend={9000} 
              title='Isolated spend'
              users={users} 
              hoveredCardId={hoveredCardId} 
              onHover={setHoveredCardId}
            />
          </ApplicationCard>
        </ApplicationCard>
      </ApplicationCard>
    </div>
  );
};