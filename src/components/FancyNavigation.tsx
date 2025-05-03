
import { memo } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLink {
  text: string;
  href: string;
  icon: React.ReactNode;
}

interface FancyNavigationProps {
  navLinks: NavLink[];
}

const FancyNavigation = memo(({ navLinks }: FancyNavigationProps) => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-3">
      {navLinks.map((link, index) => (
        <Link
          key={index}
          to={link.href}
          className={`
            group flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300
            ${
              location.pathname === link.href
                ? "bg-white/10 text-white shadow-sm"
                : "text-gray-300 hover:text-white hover:bg-white/5"
            }
          `}
        >
          <span className={`${location.pathname === link.href ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400"} transition-colors duration-300`}>
            {link.icon}
          </span>
          {link.text}
        </Link>
      ))}
    </nav>
  );
});

FancyNavigation.displayName = "FancyNavigation";

export default FancyNavigation;
