import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Film } from "lucide-react";

// Footer film categories
const footerCategories = [
  {
    title: "Popular Films",
    links: [
      { name: "The Shawshank Redemption", href: "#" },
      { name: "The Godfather", href: "#" },
      { name: "The Dark Knight", href: "#" },
      { name: "Pulp Fiction", href: "#" },
      { name: "View All Popular", href: "#" },
    ],
  },
  {
    title: "New Releases",
    links: [
      { name: "Dune: Part Two", href: "#" },
      { name: "Oppenheimer", href: "#" },
      { name: "The Batman", href: "#" },
      { name: "Poor Things", href: "#" },
      { name: "View All New Releases", href: "#" },
    ],
  },
  {
    title: "Genres",
    links: [
      { name: "Action", href: "#" },
      { name: "Drama", href: "#" },
      { name: "Comedy", href: "#" },
      { name: "Sci-Fi", href: "#" },
      { name: "View All Genres", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "About Us", href: "#" },
      { name: "Contact", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-black px-20   backdrop-blur-md text-white/80   ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 z-10">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-md p-1.5">
                <Film className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white uppercase tracking-wider">
                TheMovie
              </span>
            </Link>
            <p className="text-sm mt-4 mb-4">
              Discover and explore the best films from around the world. Your
              ultimate destination for movie recommendations and reviews.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link
                to="/"
                className="text-white/70 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                to="/"
                className="text-white/70 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                to="/"
                className="text-white/70 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                to="/"
                className="text-white/70 hover:text-white transition-colors"
              >
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Film categories */}
          {footerCategories.map((category) => (
            <div key={category.title} className="lg:col-span-1">
              <h3 className="text-white font-medium mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter and copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white font-medium mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm mb-4">
                Get weekly updates on new releases and exclusive content
              </p>
              <div className="flex gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-white/30"
                />
                <Button className="bg-white text-black hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="text-sm text-white/60 md:text-right">
              <p>© 2024 TheMovie. All rights reserved.</p>
              <p className="mt-1">
                <Link to="/" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>{" "}
                •{" "}
                <Link to="/" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
