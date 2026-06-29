import { NavLink } from "react-router";
const linkClass = ({ isActive }) =>
  [
    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-slate-900 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");

const Navbar = () => {
  return (
    <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Virtual Memory Explorer
        </h1>

        <div className="flex flex-wrap gap-2">
          <NavLink to="/" className={linkClass}>
            Simulator
          </NavLink>

          <NavLink to="/history" className={linkClass}>
            History
          </NavLink>

          <NavLink to="/analytics" className={linkClass}>
            Analytics
          </NavLink>

          <NavLink to="/page-table" className={linkClass}>
            Page Table
          </NavLink>

          <NavLink to="/translation" className={linkClass}>
            Address Translation
          </NavLink>

          <NavLink to="/physical-memory" className={linkClass}>
            Physical Memory
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
