import { Eye, Mail, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-emerald-500/30 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img
              src="/devotednote6_abstract_eye_icon_with_soft_emerald_strokes_and_a__30d2a20b-a43c-47ee-8a4d-7e083c8501e0-removebg-preview.png"
              alt="LYNX Logo"
              className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl font-bold gradient-emerald">LYNX</span>
          </div>

          <p className="text-gray-400 text-center max-w-md">
            The Eye That Builds. Architecting awareness through intelligent systems.
          </p>

          <div className="flex gap-6">
            {[Mail, Linkedin, Twitter].map((Icon, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full bg-dark-gray border border-gray-800 hover:border-emerald-500 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 group hover:glow-emerald"
              >
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" strokeWidth={1.5} />
              </div>
            ))}
          </div>

          <div className="flex gap-6 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} LYNX. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
