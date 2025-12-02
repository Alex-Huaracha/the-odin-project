import { Link } from 'react-router-dom';
import { Home, User, LogOut, Dumbbell, PlusSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

{
  /* Hidden on mobile, Block on screens sm and above */
}
const NavItem = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 p-3 rounded-full hover:bg-spotter-dark transition-colors w-fit xl:w-full"
    >
      {/* Icon */}
      <div className="w-7 h-7">{icon}</div>
      {/* Text (Visible only on large screens) */}
      <span className="hidden xl:block text-xl font-normal">{label}</span>
    </Link>
  );
};

export const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <nav className="w-20 xl:w-[275px] h-screen sticky top-0 flex flex-col border-r border-spotter-border px-2 py-4">
      <Link
        to="/"
        className="p-3 mb-4 rounded-full w-fit hover:bg-spotter-dark transition-colors"
      >
        <Dumbbell className="w-8 h-8 text-spotter-text" />
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 flex-1">
        <NavItem to="/" icon={<Home />} label="Home" />
        <NavItem to={`/u/${user?.username}`} icon={<User />} label="Profile" />

        {/* POST Button (Icon only on small screens, Text on large screens) */}
        <button className="mt-4 bg-spotter-blue hover:bg-spotter-blueHover text-white p-3 xl:py-3 xl:px-8 rounded-full font-bold shadow-lg transition-all flex justify-center items-center w-fit xl:w-full">
          <PlusSquare className="xl:hidden w-7 h-7" />
          <span className="hidden xl:block">Post</span>
        </button>
      </div>

      {/* Logout Button (At the bottom) */}
      <button
        onClick={() => logout()}
        className="p-3 flex items-center gap-4 rounded-full hover:bg-spotter-dark transition-colors mb-4"
      >
        <LogOut className="w-6 h-6" />
        <div className="hidden xl:block text-left">
          <p className="font-bold text-sm">Log Out</p>
          <p className="text-spotter-textGray text-xs">@{user?.username}</p>
        </div>
      </button>
    </nav>
  );
};
