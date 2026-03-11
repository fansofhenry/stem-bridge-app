export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/52 px-[5vw] pt-14 pb-20 md:pb-6">
      {/* SLI & MESA Funding Banner */}
      <div className="bg-white/6 border border-white/10 rounded-2xl px-6 py-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold-light mb-1">Made possible by</p>
          <p className="text-white/85 text-sm leading-relaxed">
            StemBridge is funded by the{" "}
            <a href="https://foothill.edu/sli/" target="_blank" rel="noopener noreferrer"
              className="text-gold-light font-bold no-underline hover:underline">
              Science Learning Institute (SLI)
            </a>
            {" "}and{" "}
            <span className="text-gold-light font-bold">MESA</span>
            {" "}at Foothill College — programs dedicated to expanding STEM access for first-generation,
            low-income, and underrepresented students.
          </p>
        </div>
        <a href="https://foothill.edu/sli/" target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-xs font-bold bg-gold-DEFAULT text-white no-underline
            hover:bg-gold-light hover:text-charcoal transition-all whitespace-nowrap flex-shrink-0">
          Learn about SLI
        </a>
      </div>

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
          { heading:"Communities", links:[["https://foothill.edu/sli/","SLI"],["https://foothill.edu/mesa/","MESA"],["https://foothill.edu/umoja/","Umoja"],["https://foothill.edu/puente/","Puente"],["https://foothill.edu/eti/","ETI"]] },
          { heading:"Connect", links:[["#about","About StemBridge"],["https://github.com/fansofhenry/stem-bridge-app","GitHub"],["#","Contact Henry"],["#","Contact Cris"]] },
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
        <span>&copy; 2026 StemBridge &middot; Foothill College. Funded by SLI &amp; MESA. Built by students, for students.</span>
        <span className="text-white/22" title="StemBridge is built by students from Foothill College and San José State University">Built by Foothill Owls &amp; SJSU Spartans 🦉🐦</span>
      </div>
    </footer>
  );
}
