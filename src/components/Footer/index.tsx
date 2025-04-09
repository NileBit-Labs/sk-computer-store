import React from "react";
import { Mail, MapPin, Phone, Code } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#00918e] relative">
      {/* Developer Signature */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
        <a
          href="https://nilebitlabs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white flex items-center gap-2 hover:text-teal-200 transition-colors underline"
        >
          <Code size={16} />
          <span>
            Crafted by <strong className="text-base">NileBit Labs</strong>
          </span>
        </a>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-6 lg:col-start-1 lg:col-end-2">
            <h3 className="text-lg font-semibold text-white">
              SK Computer Store
            </h3>
            <p className="text-sm text-white max-w-sm">
              Empowering innovation through technology. We create solutions that
              make a difference.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-white">
                <MapPin size={18} className="text-teal-200 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/mjNy3SSePaNxwkzw5?g_st=com.google.maps.preview.copy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors"
                >
                  Room B09 University Plaza, Wandegeya, Kampala, Uganda. <br />{" "}
                  Opposite Getwell Pharmacy
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-white p-4 bg-gray-800 rounded-lg max-w-xs">
                <Phone size={18} className="text-teal-200 flex-shrink-0 mt-1" />

                <div className="flex flex-col gap-2">
                  <a
                    href="tel:+256774077357"
                    className="hover:underline transition-colors"
                  >
                    (+256) 774-077-357
                  </a>

                  <a
                    href="tel:+256394822154"
                    className="hover:underline transition-colors"
                  >
                    (+256) 394-822-154
                  </a>

                  <a
                    href="tel:+256706931342"
                    className="hover:underline transition-colors"
                  >
                    (+256) 706-931-342
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-white">
                <Mail size={18} className="text-teal-200 flex-shrink-0" />
                <a
                  href="mailto:solokigezi777@gmail.com"
                  className="hover:underline transition-colors"
                >
                  solokigezi777@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-start-3 lg:col-end-4">
            <h3 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-4">
              {["About Us", "Privacy Policy", "Terms of Service", "FAQ"].map(
                (item) => (
                  <a
                    key={item}
                    href="/aboutus"
                    className="text-sm text-white hover:underline transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Resources */}
          {/* <div>
            <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
            <nav className="flex flex-col space-y-4">
              {[
                "Privacy Policy",
                "Terms of Service",
                "FAQ",
                "Support Center",
                "Documentation",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-white hover:underline transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white">
              © {year} SK Computer Store. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex space-x-6">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(
                (platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="text-white hover:text-teal-200 transition-colors"
                    aria-label={platform}
                  >
                    <span className="sr-only">{platform}</span>
                    {platform === "Facebook" && (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {platform === "Twitter" && (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    )}
                    {platform === "Instagram" && (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0c-3.259 0-3.667.015-4.947.072-4.358.2-6.78 2.618-6.98 6.98C0 8.333 0 8.741 0 12c0 3.259.015 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 24 8.741 24 12 24c3.259 0 3.668-.015 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98C24 15.668 24 15.259 24 12c0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98C15.668 0 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z" />
                      </svg>
                    )}
                    {platform === "LinkedIn" && (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
