
import { Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="text-zygo-red mr-2" size={24} />
              <h3 className="text-2xl font-bold">Zygo</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Building stronger families through connection, growth, and shared experiences. 
              Join our community and discover the joy of growing together.
            </p>
            <div className="flex space-x-4">
              <Facebook className="text-gray-400 hover:text-zygo-red cursor-pointer transition-colors" size={24} />
              <Twitter className="text-gray-400 hover:text-zygo-red cursor-pointer transition-colors" size={24} />
              <Instagram className="text-gray-400 hover:text-zygo-red cursor-pointer transition-colors" size={24} />
              <Linkedin className="text-gray-400 hover:text-zygo-red cursor-pointer transition-colors" size={24} />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-zygo-red transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-zygo-red transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-zygo-red transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-300 hover:text-zygo-red transition-colors">Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-zygo-red transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-zygo-red transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-zygo-red transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-zygo-red transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-zygo-red transition-colors">Safety Guidelines</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 mb-2">
            © 2024 Zygo. Made with <Heart className="inline text-zygo-red" size={16} /> for families everywhere.
          </p>
          <p className="text-gray-400">
            Made in Australia with <Heart className="inline text-zygo-red" size={16} />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
