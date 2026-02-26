import { Link } from "react-router-dom";
import { Linkedin, Send } from "lucide-react";
import logo from "@/assets/logo-dark.png";

const footerLinks = {
  solutions: [
    { label: "Wholesale Data", href: "/solutions/wholesale-mobile-data" },
    { label: "White-Label eSIM", href: "/solutions/white-label-esim" },
    { label: "Consulting", href: "/solutions/consulting" },
  ],
  development: [
    { label: "Billing Platform", href: "/development/billing-platform" },
    { label: "eSIM Store", href: "/development/esim-store" },
    { label: "Telecom Software", href: "/development/telecom-software" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  partners: [
    { label: "Partner Program", href: "/partners" },
  ],
  trust: [
    { label: "Trust Center", href: "/trust" },
    { label: "Security Practices", href: "/trust/security" },
    { label: "Partner Compliance", href: "/trust/partner-compliance" },
    { label: "Telecom Disclosure", href: "/trust/telecom-disclosure" },
  ],
  legal: [
    { label: "Legal Documents", href: "/legal" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookies Policy", href: "/legal/cookies" },
    { label: "Acceptable Use", href: "/legal/acceptable-use" },
    { label: "DPA", href: "/legal/data-processing-agreement" },
    { label: "API Terms", href: "/legal/api-terms" },
    { label: "SLA", href: "/legal/sla" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/2skymobile", label: "LinkedIn" },
  { icon: Send, href: "https://t.me/sky2mobile", label: "Telegram" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border text-foreground">
      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-8 gap-8 lg:gap-10 mb-12">
          {/* Brand & Contact */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="2SkyMobile" className="h-16 w-auto" width={114} height={64} loading="lazy" decoding="async" />
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
              Global telecom infrastructure, eSIM solutions and software for MVNOs, resellers and digital brands.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Solutions</h3>
            <ul className="space-y-2.5">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Development */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Development</h3>
            <ul className="space-y-2.5">
              {footerLinks.development.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.partners.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Trust</h3>
            <ul className="space-y-2.5">
              {footerLinks.trust.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2026 2SkyMobile LLC. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground">
              <Link to="/legal" className="hover:text-primary transition-colors">
                Legal Documents
              </Link>
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
