import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="text-gray-400 hover:text-white transition-colors">Careers</a>
                </Link>
              </li>
              <li>
                <Link href="/press">
                  <a className="text-gray-400 hover:text-white transition-colors">Press</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy">
                  <a className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="/copyright">
                  <a className="text-gray-400 hover:text-white transition-colors">Copyright</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help">
                  <a className="text-gray-400 hover:text-white transition-colors">Help Center</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-gray-400 hover:text-white transition-colors">FAQ</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {currentYear} VideoStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}