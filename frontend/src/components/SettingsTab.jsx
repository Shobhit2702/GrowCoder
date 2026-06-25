export default function SettingsTab() {
  return (
    <div className="space-y-6">
      <section className="mb-2">
        <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-bold">PREFERENCES</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white mt-1">
          Settings
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
          Manage your CodePilot system preferences, sync parameters, and target goals.
        </p>
      </section>

      <section className="glass-card rounded-[24px] p-6 space-y-5">
        <div>
          <label className="block text-[9px] tracking-widest text-zinc-500 uppercase font-bold mb-2 font-mono">
            Leetcode Username
          </label>
          <input 
            type="text" 
            defaultValue="alanturing"
            className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 focus:border-brand-indigo rounded-xl px-4 py-3 text-xs focus:outline-none text-zinc-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-[9px] tracking-widest text-zinc-500 uppercase font-bold mb-2 font-mono">
            Target Company / Preparation Path
          </label>
          <select 
            className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 focus:border-brand-indigo rounded-xl px-4 py-3 text-xs focus:outline-none text-zinc-900 dark:text-white"
            defaultValue="faang"
          >
            <option value="faang">FAANG Aspirant</option>
            <option value="google">Google Specialization</option>
            <option value="internship">Internship Level Preparation</option>
            <option value="competitive">Competitive Programming Focus</option>
          </select>
        </div>

        <div>
          <label className="block text-[9px] tracking-widest text-zinc-500 uppercase font-bold mb-2 font-mono">
            Daily Goal (Problems per Day)
          </label>
          <input 
            type="number" 
            defaultValue={3} 
            className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 focus:border-brand-indigo rounded-xl px-4 py-3 text-xs focus:outline-none text-zinc-900 dark:text-white"
          />
        </div>

        <button 
          className="w-full bg-brand-indigo hover:bg-brand-indigo/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-brand-indigo/10 text-xs"
          onClick={() => alert('Settings saved successfully.')}
        >
          Save Settings
        </button>
      </section>
    </div>
  )
}
