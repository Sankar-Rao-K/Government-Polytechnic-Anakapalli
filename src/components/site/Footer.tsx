import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Youtube, Instagram, MapPin, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Government Polytechnic, Anakapalli logo"
              className="h-12 w-12 object-contain rounded-full bg-white/95 p-0.5"
            />
            <div>
              <div className="font-display font-semibold leading-tight">Government Polytechnic,<br />Anakapalli</div>
              <div className="text-xs opacity-75 mt-0.5">Estd. 2008</div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80 leading-relaxed">
            A premier government polytechnic institution committed to delivering quality
            technical education and skilled professionals to the nation.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            {[
              ["/about", "About College"],
              ["/departments", "Departments"],
              ["/faculty", "Faculty"],
              ["/placements", "Careers"],
              ["/notices", "Notices"],
              ["/downloads", "Downloads"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            Student Hub
          </h3>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            {[
              ["/library", "Library"],
              ["/scholarships", "Scholarships"],
              ["/student-services", "Student Services"],
              ["/anti-ragging", "Anti-Ragging Cell"],
              ["/faculty", "Faculty"],
              ["/committees", "Committees & Cells"],
              ["/gallery", "Gallery"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li className="flex gap-3">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
              <span>Rebaka Village, Anakapalli Mandal,<br />Visakhapatnam Dist., Andhra Pradesh — 531002</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
              <a href="tel:+919010222173" className="hover:text-gold">+91 90102 22173</a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
              <a href="mailto:polytechnic.government173@gmail.com" className="hover:text-gold break-all">
                polytechnic.government173@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-xs opacity-75">
          <span>© {new Date().getFullYear()} Government Polytechnic, Anakapalli. All rights reserved.</span>
          <span>An institution of the Government of Andhra Pradesh</span>
        </div>
      </div>
    </footer>
  );
}
