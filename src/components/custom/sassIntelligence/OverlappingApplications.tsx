// 'use client'
// import React, { useState, useRef, useEffect } from 'react';
// import { Card } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { ChevronDown } from 'lucide-react';
// import { AppImages } from '@/lib/config/app-images';
// import Image from 'next/image';

// const ApplicationCard = ({ 
//   id,
//   apps, 
//   spend, 
//   title,
//   users, 
//   children,
//   hoveredCardId,
//   onHover 
// }: { 
//   id: string;
//   apps: {name: string, logo: string}[];
//   spend: number;
//   title: string;
//   users: string[];
//   children?: React.ReactNode;
//   hoveredCardId: string | null;
//   onHover: (id: string | null) => void;
// }) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const cardElement = cardRef.current;

//     const handleMouseEnter = () => {
//       onHover(id);
//     };

//     const handleMouseLeave = () => {
//       onHover(null);
//     };

//     if (cardElement) {
//       cardElement.addEventListener('mouseenter', handleMouseEnter);
//       cardElement.addEventListener('mouseleave', handleMouseLeave);
//     }

//     return () => {
//       if (cardElement) {
//         cardElement.removeEventListener('mouseenter', handleMouseEnter);
//         cardElement.removeEventListener('mouseleave', handleMouseLeave);
//       }
//     };
//   }, [id, onHover]);

//   return (
//     <Card 
//       ref={cardRef}
//       className={`flex min-w-fit p-4 border rounded-3xl transition-all relative ${
//         hoveredCardId === id ? 'ring-2 ring-doow_primary backdrop-blur shadow-doow_primary shadow-md' : ''
//       }`}
//     >
//       <div className="space-y-6 pr-4 my-auto">
//         <div className='flex items-center justify-between w-full gap-6'>
//           <div className='w-full '>
//             <p className="text-sm text-doow_grey">{title}</p>
//             <p className="text-xl font-bold">${spend.toLocaleString()}</p>
//           </div>
//           <div className="flex items-center max-w-fit">
//             <div className="flex -space-x-2">
//               {apps.map((app, i) => 
//                 <Avatar key={i} className="h-6 w-6 border-2 border-background">
//                   <AvatarImage src={app.logo} />
//                   <AvatarFallback>A</AvatarFallback>
//                 </Avatar>
//               )}
//             </div>
//             <div className="inline-flex items-center rounded-md">
//               <ChevronDown className="h-4 w-4" />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-1">
//           {
//             users.map((user, i) => 
//             <Avatar key={i} className="w-7 h-7 border-2 border-background">
//               <AvatarImage src={user} className='object-cover' />
//               <AvatarFallback>A</AvatarFallback>
//             </Avatar>
//           )}
//         </div>

//         <p className="text-sm text-gray-500">{users.length} {hoveredCardId === id && title === 'Overlapping spend' && `Overlapping` } users</p>
//       </div>

//       {children && (
//         <div>
//           {children}
//         </div>
//       )}
//     </Card>
//   );
// };

// export const OverlappingApplications = () => {
//   const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
//    const apps = [
//     {name: 'notion', logo: AppImages.logos.notion},
//     {name: 'slack', logo: AppImages.logos.slack},
//     {name: 'teams', logo: AppImages.logos.teams},
//     {name: 'zoom', logo: AppImages.logos.zoom},
//    ]

//    const users = [
//     AppImages.profiles.afro, AppImages.profiles.aiony, AppImages.profiles.anthony,
//     AppImages.profiles.ayo, AppImages.profiles.joseph, AppImages.profiles.jurica, AppImages.profiles.lucas,
//     AppImages.profiles.lupita, AppImages.profiles.mathias, AppImages.profiles.micheal, AppImages.profiles.prince,
//   ]

//   return (
//     <div className="p-4 overflow-auto w-full max-w-full bg-white rounded-2xl">
//       {/* tabs */}
//       <div className="flex justify-between items-center gap-10 mb-4 w-full overflow-auto whitespace-nowrap">
//         {apps.map((app, idx) => 
//           <div key={idx} className='flex justify-between items-center rounded-md border-2 px-4 py-2 flex-shrink-0 min-w-[200px]'>
//             <div className='flex justify-between items-center'>
//               <div
//                 className="flex min-w-fit items-center justify-center mr-2 bg-white"
//               >
//                 <Image 
//                   src={app.logo}
//                   alt={`${app.name} logo`}
//                   width={30}
//                   height={30}
//                   className="border border-white"
//                 />
//               </div>
//               <p className='text-sm font-semibold capitalize'>{app.name}</p>
//             </div>
//             <div className="inline-flex items-center rounded-md">
//                   <ChevronDown className="h-4 w-4" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Application cards */}
//       <ApplicationCard 
//         id="notion" 
//         apps={apps}
//         spend={9000} 
//         title='Overlapping spend'
//         users={users} 
//         hoveredCardId={hoveredCardId} 
//         onHover={setHoveredCardId}
//       >
//         <ApplicationCard 
//           id="zoom" 
//           apps={apps.slice(0, 3)}
//           spend={9000} 
//           title='Overlapping spend'
//           users={users} 
//           hoveredCardId={hoveredCardId} 
//           onHover={setHoveredCardId}
//         >
//           <ApplicationCard 
//             id="teams" 
//             apps={apps.slice(0, 2)}
//             spend={9000} 
//             title='Overlapping spend'
//             users={users} 
//             hoveredCardId={hoveredCardId} 
//             onHover={setHoveredCardId}
//           >
//             <ApplicationCard 
//               id="slack" 
//               apps={apps.slice(0, 1)} 
//               spend={9000} 
//               title='Isolated spend'
//               users={users} 
//               hoveredCardId={hoveredCardId} 
//               onHover={setHoveredCardId}
//             />
//           </ApplicationCard>
//         </ApplicationCard>
//       </ApplicationCard>
//     </div>
//   );
// };


// 'use client'
// import React, { useState, useRef, useEffect } from 'react';
// import { Card } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { ChevronDown } from 'lucide-react';
// import { AppImages } from '@/lib/config/app-images';
// import Image from 'next/image';

// const ApplicationCard = ({ 
//   id,
//   apps, 
//   spend, 
//   title,
//   users, 
//   children,
//   hoveredCardId,
//   onHover 
// }: { 
//   id: string;
//   apps: {name: string, logo: string}[];
//   spend: number;
//   title: string;
//   users: string[];
//   children?: React.ReactNode;
//   hoveredCardId: string | null;
//   onHover: (id: string | null) => void;
// }) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   // Track whether this specific card is directly hovered (not just its children)
//   const [isDirectlyHovered, setIsDirectlyHovered] = useState(false);

//   useEffect(() => {
//     const cardElement = cardRef.current;

//     const handleMouseEnter = (e: MouseEvent) => {
//       // First check if the current target contains the event target
//       // This ensures we're handling events that belong to this card
//       if (e.target === cardElement || cardElement?.contains(e.target as Node)) {
//         // relatedTarget is the element the mouse came FROM before entering this element
//         // If relatedTarget is null, mouse came from outside the window
//         // If relatedTarget is not a child of this card, mouse entered from outside this card
//         if (e.relatedTarget === null || !cardElement?.contains(e.relatedTarget as Node)) {
//           setIsDirectlyHovered(true);
//           onHover(id);
//         }
//       }
//     };

//     const handleMouseLeave = (e: MouseEvent) => {
//       // relatedTarget is the element the mouse is going TO after leaving this element
//       // If relatedTarget is null, mouse is leaving the window
//       // If relatedTarget is not a child of this card, mouse is truly leaving this card
//       if (e.relatedTarget === null || !cardElement?.contains(e.relatedTarget as Node)) {
//         setIsDirectlyHovered(false);
//         // Only clear hover if this card is the currently hovered one
//         if (hoveredCardId === id) {
//           onHover(null);
//         }
//       }
//       // If relatedTarget IS a child of this card, we're just moving to a child element
//       // In that case, do nothing - we want the mouse to still be considered "hovering" the parent
//     };

//     if (cardElement) {
//       cardElement.addEventListener('mouseenter', handleMouseEnter);
//       cardElement.addEventListener('mouseleave', handleMouseLeave);
//     }

//     // Clean up event listeners on unmount
//     return () => {
//       if (cardElement) {
//         cardElement.removeEventListener('mouseenter', handleMouseEnter);
//         cardElement.removeEventListener('mouseleave', handleMouseLeave);
//       }
//     };
//   }, [id, onHover, hoveredCardId]);

//   return (
//     <Card 
//       ref={cardRef}
//       className={`flex min-w-fit p-4 border rounded-3xl transition-all relative ${
//         hoveredCardId === id ? 'ring-2 ring-doow_primary backdrop-blur shadow-doow_primary shadow-md' : ''
//       }`}
//       // Add a data attribute for debugging - helps visualize the hover state in dev tools
//       data-hovered={isDirectlyHovered ? "true" : "false"}
//     >
//       <div className="space-y-6 pr-4 my-auto">
//         <div className='flex items-center justify-between w-full gap-6'>
//           <div className='w-full '>
//             <p className="text-sm text-doow_grey">{title}</p>
//             <p className="text-xl font-bold">${spend.toLocaleString()}</p>
//           </div>
//           <div className="flex items-center max-w-fit">
//             <div className="flex -space-x-2">
//               {apps.map((app, i) => 
//                 <Avatar key={i} className="h-6 w-6 border-2 border-background">
//                   <AvatarImage src={app.logo} />
//                   <AvatarFallback>A</AvatarFallback>
//                 </Avatar>
//               )}
//             </div>
//             <div className="inline-flex items-center rounded-md">
//               <ChevronDown className="h-4 w-4" />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-1">
//           {
//             users.map((user, i) => 
//             <Avatar key={i} className="w-7 h-7 border-2 border-background">
//               <AvatarImage src={user} className='object-cover' />
//               <AvatarFallback>A</AvatarFallback>
//             </Avatar>
//           )}
//         </div>

//         <p className="text-sm text-gray-500">{users.length} {hoveredCardId === id && title === 'Overlapping spend' && `Overlapping` } users</p>
//       </div>

//       {/* Separate container for nested cards helps with clearer DOM structure */}
//       {children && (
//         <div className="nested-card-container">
//           {children}
//         </div>
//       )}
//     </Card>
//   );
// };

// export const OverlappingApplications = () => {
//   // Single source of truth for which card is currently hovered
//   const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  
//   // Handler function to update the hovered card state
//   const handleCardHover = (id: string | null) => {
//     setHoveredCardId(id);
//   };
  
//    const apps = [
//     {name: 'notion', logo: AppImages.logos.notion},
//     {name: 'slack', logo: AppImages.logos.slack},
//     {name: 'teams', logo: AppImages.logos.teams},
//     {name: 'zoom', logo: AppImages.logos.zoom},
//    ]

//    const users = [
//     AppImages.profiles.afro, AppImages.profiles.aiony, AppImages.profiles.anthony,
//     AppImages.profiles.ayo, AppImages.profiles.joseph, AppImages.profiles.jurica, AppImages.profiles.lucas,
//     AppImages.profiles.lupita, AppImages.profiles.mathias, AppImages.profiles.micheal, AppImages.profiles.prince,
//   ]

//   return (
//     <div className="p-4 overflow-auto w-full max-w-full bg-white rounded-2xl">
//       {/* tabs */}
//       <div className="flex justify-between items-center gap-10 mb-4 w-full overflow-auto whitespace-nowrap">
//         {apps.map((app, idx) => 
//           <div key={idx} className='flex justify-between items-center rounded-md border-2 px-4 py-2 flex-shrink-0 min-w-[200px]'>
//             <div className='flex justify-between items-center'>
//               <div
//                 className="flex min-w-fit items-center justify-center mr-2 bg-white"
//               >
//                 <Image 
//                   src={app.logo}
//                   alt={`${app.name} logo`}
//                   width={30}
//                   height={30}
//                   className="border border-white"
//                 />
//               </div>
//               <p className='text-sm font-semibold capitalize'>{app.name}</p>
//             </div>
//             <div className="inline-flex items-center rounded-md">
//                   <ChevronDown className="h-4 w-4" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Application cards - nested structure with shared hover state handler */}
//       <ApplicationCard 
//         id="notion" 
//         apps={apps}
//         spend={9000} 
//         title='Overlapping spend'
//         users={users} 
//         hoveredCardId={hoveredCardId} 
//         onHover={handleCardHover}
//       >
//         <ApplicationCard 
//           id="zoom" 
//           apps={apps.slice(0, 3)}
//           spend={9000} 
//           title='Overlapping spend'
//           users={users} 
//           hoveredCardId={hoveredCardId} 
//           onHover={handleCardHover}
//         >
//           <ApplicationCard 
//             id="teams" 
//             apps={apps.slice(0, 2)}
//             spend={9000} 
//             title='Overlapping spend'
//             users={users} 
//             hoveredCardId={hoveredCardId} 
//             onHover={handleCardHover}
//           >
//             <ApplicationCard 
//               id="slack" 
//               apps={apps.slice(0, 1)} 
//               spend={9000} 
//               title='Isolated spend'
//               users={users} 
//               hoveredCardId={hoveredCardId} 
//               onHover={handleCardHover}
//             />
//           </ApplicationCard>
//         </ApplicationCard>
//       </ApplicationCard>
//     </div>
//   );
// };


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
    
    // Track if mouse is over this card (including its non-card children)
    const handleMouseOver = (e: MouseEvent) => {
      // Stop propagation to prevent parent cards from detecting this event
      e.stopPropagation();
      
      // Check if the event target is this card or one of its non-card children
      if (e.target === cardElement || (cardElement?.contains(e.target as Node))) {
        // Only trigger if we're not already the hovered card
        if (hoveredCardId !== id) {
          onHover(id);
        }
      }
    };
    
    // Track when mouse completely leaves this card (and its children)
    const handleMouseOut = (e: MouseEvent) => {
      // We only care about the event if we're the currently hovered card
      if (hoveredCardId === id) {
        // Check if we're actually leaving this card's boundary (not just moving to a child)
        // relatedTarget is where the mouse is going
        if (e.relatedTarget === null || !cardElement?.contains(e.relatedTarget as Node)) {
          onHover(null);
        }
      }
    };

    if (cardElement) {
      // Using mouseover/mouseout instead of mouseenter/mouseleave for better nested element handling
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

  return (
    <Card 
      ref={cardRef}
      className={`flex min-w-fit p-4 border rounded-3xl transition-all relative ${
        hoveredCardId === id ? 'ring-2 ring-doow_primary backdrop-blur shadow-doow_primary shadow-md' : ''
      }`}
      data-id={id}
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
        <div 
          className="nested-card-container"
          // Add a special handler for direct interaction with the container
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </Card>
  );
};

const OverlappingApplications = () => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  
  // Handler to update which card is currently hovered
  const handleCardHover = (id: string | null) => {
    setHoveredCardId(id);
  };
  
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
          <div key={idx} className='flex justify-between items-center rounded-md border-2 px-4 py-2 flex-shrink-0 min-w-[250px]'>
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
        onHover={handleCardHover}
      >
        <ApplicationCard 
          id="zoom" 
          apps={apps.slice(0, 3)}
          spend={9000} 
          title='Overlapping spend'
          users={users} 
          hoveredCardId={hoveredCardId} 
          onHover={handleCardHover}
        >
          <ApplicationCard 
            id="teams" 
            apps={apps.slice(0, 2)}
            spend={9000} 
            title='Overlapping spend'
            users={users} 
            hoveredCardId={hoveredCardId} 
            onHover={handleCardHover}
          >
            <ApplicationCard 
              id="slack" 
              apps={apps.slice(0, 1)} 
              spend={9000} 
              title='Isolated spend'
              users={users} 
              hoveredCardId={hoveredCardId} 
              onHover={handleCardHover}
            />
          </ApplicationCard>
        </ApplicationCard>
      </ApplicationCard>
    </div>
  );
};

export default  OverlappingApplications;