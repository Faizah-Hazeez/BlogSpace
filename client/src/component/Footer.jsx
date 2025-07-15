import Logo from "@/ui/Logo";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 px-6 py-10 lg:px-20  ">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
        {/* Branding Section */}
        <div className="col-span-1">
          <Logo />
          <p className="mt-2 text-gray-600 text-sm">
            Your go-to destination for the latest in fashion, beauty, and
            technology. Explore our blog for inspiration and insights.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-blue-400 transition-colors"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Connect With Us
          </h2>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5V12h3.642L18 8h-3.642V6.667c0-.955.192-1.333 1.115-1.333h2.527V1h-3.637C12.623 1 11 2.623 11 4.667V8z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.307 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.307-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.307-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.307 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.425.065-2.888.362-4.023 1.497C1.893 2.704 1.596 4.167 1.531 5.592c-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.065 1.425.362 2.888 1.497 4.023 1.135 1.135 2.598 1.432 4.023 1.497 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.425-.065 2.888-.362 4.023-1.497 1.135-1.135 1.432-2.598 1.497-4.023.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.065-1.425-.362-2.888-1.497-4.023-1.135-1.135-2.598-1.432-4.023-1.497-1.28-.058-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
          </div>
          <p className="text-sm text-gray-600">
            Email:{" "}
            <a
              href="mailto:contact@blogspace.com"
              className="hover:text-blue-400"
            >
              contact@blogspace.com
            </a>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="col-span-4 text-center mt-6 border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">
          &copy; {currentYear} BlogSpace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
