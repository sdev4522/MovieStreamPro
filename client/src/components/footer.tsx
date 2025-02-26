import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-primary">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="text-muted-foreground hover:text-primary">Careers</a>
                </Link>
              </li>
              <li>
                <Link href="/press">
                  <a className="text-muted-foreground hover:text-primary">Press</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">
                  <a className="text-muted-foreground hover:text-primary">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-muted-foreground hover:text-primary">Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="/copyright">
                  <a className="text-muted-foreground hover:text-primary">Copyright</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help">
                  <a className="text-muted-foreground hover:text-primary">Help Center</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary">Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="text-muted-foreground hover:text-primary">FAQ</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">Facebook</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {currentYear} VideoStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
