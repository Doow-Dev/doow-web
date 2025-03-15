import { useState, useRef, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Make sure this import exists in your project
import { buttonVariants } from "@/components/ui/button"; // Make sure this import exists in your project

// eslint-disable-next-line
export const MobileNav = ({ mainNavItems }: { mainNavItems: any }) => {
  // Separate state for menu visibility and accordion sections
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Toggle accordion sections
  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="relative block md:hidden">
      {" "}
      {/* Only show on mobile screens */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 text-gray-800 flex items-center justify-center"
        aria-label="Toggle mobile menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 z-50 overflow-y-auto max-h-[90vh] border-t"
            style={{ maxWidth: "100vw" }}
          >
            {/* eslint-disable-next-line */}
            {mainNavItems.map((item: any, index: number) => (
              <div key={index} className="mb-4 border-b pb-2 last:border-b-0">
                {item.dropdownItems ? (
                  <>
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full py-2 text-left text-lg font-semibold text-gray-900 flex justify-between items-center"
                      aria-expanded={activeAccordion === index}
                      aria-controls={`accordion-content-${index}`}
                    >
                      {item.title}
                      <span className="text-gray-500">
                        {activeAccordion === index ? "▲" : "▼"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {activeAccordion === index && (
                        <motion.div
                          id={`accordion-content-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 space-y-3 overflow-hidden pl-2"
                        >
                          {/* eslint-disable-next-line */}
                          {item.dropdownItems.map((subItem:any, subIndex:number) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-100 transition"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className="mt-1 text-primary">
                                {subItem.icon}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  {subItem.title}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {subItem.subtitle}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  // Render non-dropdown items as direct links
                  <Link
                    href={item.link}
                    className="block w-full py-2 text-lg font-semibold text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
            {/* Sign In Button */}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "rounded-full bg-doow_primary text-gray-500 hover:text-gray-900"
                )}
                href="/signin"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
