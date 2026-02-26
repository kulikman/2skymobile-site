import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useHiddenPages } from "@/hooks/use-page-settings";
import logo from "@/assets/logo-dark.png";

const navigationItems = [
  {
    label: "Solutions",
    items: [
      { label: "Wholesale Mobile Data", href: "/solutions/wholesale-mobile-data" },
      { label: "White-Label eSIM Store", href: "/solutions/white-label-esim" },
      { label: "Consulting", href: "/solutions/consulting" },
    ],
  },
  {
    label: "Development",
    items: [
      { label: "Billing Platform", href: "/development/billing-platform" },
      { label: "eSIM Store", href: "/development/esim-store" },
      { label: "Telecom Software", href: "/development/telecom-software" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Partners", href: "/partners" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const hiddenPages = useHiddenPages();

  const filteredNavItems = useMemo(() => {
    return navigationItems
      .map((item) => {
        if ("items" in item) {
          const visibleItems = item.items.filter((sub) => !hiddenPages.has(sub.href));
          if (visibleItems.length === 0) return null;
          return { ...item, items: visibleItems };
        }
        return hiddenPages.has(item.href) ? null : item;
      })
      .filter(Boolean) as typeof navigationItems;
  }, [hiddenPages]);

  const isContactHidden = hiddenPages.has("/contact");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="2SkyMobile" className="h-14 lg:h-16 w-auto" width={114} height={64} loading="eager" decoding="async" fetchPriority="high" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {filteredNavItems.map((item) =>
              "items" in item ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isScrolled
                        ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`absolute top-full left-0 pt-2 min-w-[240px] transition-all duration-200 ${
                      openDropdown === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="bg-card rounded-xl border border-border/50 shadow-xl p-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isScrolled
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}

            {!isContactHidden && (
              <Link
                to="/contact"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                Contact
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden bg-background border-t border-border/50 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-1 overflow-y-auto max-h-[70vh]">
          {filteredNavItems.map((item) =>
            "items" in item ? (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setOpenMobileDropdown(openMobileDropdown === item.label ? null : item.label)
                  }
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openMobileDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openMobileDropdown === item.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-4 py-1 space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            )
          )}

          {!isContactHidden && (
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Contact
            </Link>
          )}

          <div className="pt-4 space-y-2 border-t border-border/50">
            <Button className="w-full" variant="glow" asChild>
              <Link to="/contact">Book a Free Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
