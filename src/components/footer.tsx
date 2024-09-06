import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark:bg-gray-900 bg-white dark:text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">DevConnect</h3>
            <p className="text-sm">
              Empowering developers through video calls and screen sharing.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-gray-300">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-gray-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/RiyadhBenhallou"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Github size={24} />
              </a>
              <a
                href="https://x.com/RiadhBenhallou"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/riyadh-benhallou-8a9101291"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-indigo-800 text-center">
          <p className="text-sm">
            &copy; {currentYear} DevConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
