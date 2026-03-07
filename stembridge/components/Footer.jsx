export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/52 px-[5vw] pt-14 pb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display font-bold text-xl text-white mb-2">
            Stem<span className="text-gold-DEFAULT">Bridge</span>
          </div>
          <p className="text-[0.78rem] leading-loose max-w-[260px]">
            A student-built STEM collaboration platform for Foothill College — designed for first-gen,
            international, and underrepresented students.
          </p>
        </div>
        {[
          { heading:"Platform", links:[["#search-anchor","Browse Projects"],["#match","Find My Match"],["#","Upload Project"],["#","Post Wanted Ad"]] },
          { heading:"Communities", links:[["#","MESA"],["#","Umoja"],["#","Puente"],["#","ETI"]] },
          { heading:"Connect", links:[["#","About StemBridge"],["https://github.com/fansofhenry/Foothill_Student_Projects","GitHub"],["#","Contact Henry"],["#","Contact Cris"]] },
        ].map(col => (
          <div key={col.heading}>
            <h4 className="text-white/85 font-bold text-[0.72rem] uppercase tracking-widest mb-3">{col.heading}</h4>
            <ul className="list-none flex flex-col gap-2">
              {col.links.map(([href, label]) => (
                <li key={label}><a href={href} className="text-white/42 text-[0.78rem] no-underline hover:text-gold-light transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/7 pt-4 flex justify-between items-center flex-wrap gap-3 text-[0.72rem]">
        <span>© 2026 StemBridge · Foothill College. Built by students, for students.</span>
        <span className="text-white/22">Foothill Owls &amp; SJSU Spartans fly together 🦉</span>
      </div>
    </footer>
  );
}
