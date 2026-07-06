import AboutClient from './AboutClient';
import EarthParticlesClient from './EarthParticlesClient';
import SmartBackgroundVideo from './SmartBackgroundVideo';


type About = {
  headline: string;
  status: string;
  projectNo: string;
};

type Profile = {
  profile_url: string;
};

async function getAboutData(): Promise<{ about: About; profile: Profile }> {
  const [aboutRes, picRes] = await Promise.all([
    fetch('https://my-api-6pmy.onrender.com/api/profile/about', { cache: 'no-store' }),
    fetch('https://my-api-6pmy.onrender.com/api/profile/profilepic', { cache: 'no-store' }),
  ]);

  if (!aboutRes.ok || !picRes.ok) {
    throw new Error('Failed to fetch profile information');
  }

  const [aboutData, picData] = await Promise.all([
    aboutRes.json(),
    picRes.json(),
  ]);

  return {
    about: aboutData.data.about,
    profile: picData.data.profilePicture,
  };
}

export default async function About() {
  let data: { about: About; profile: Profile } | null = null;
  let error = false;

  try {
    data = await getAboutData();
  } catch (err) {
    console.error(err);
    error = true;
  }

  return (
    <section
      id="about"
      className="relative max-md:sticky max-md:top-0 min-h-screen w-full overflow-hidden flex items-center justify-center z-0"
    >
      {/* ── Background Video ─────────────────────────── */}
      <SmartBackgroundVideo 
        sources={[
          { src: "/about/aboutback.webm", type: "video/webm" },
          { src: "/about/abouback2.mp4", type: "video/mp4" }
        ]}
      />

      {/* Dark overlay to preserve readability */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(160deg, rgba(10,26,8,0.78) 0%, rgba(15,28,10,0.72) 30%, rgba(26,16,5,0.75) 60%, rgba(13,18,8,0.80) 100%)',
        }}
      />

      {/* Earthy radial glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 30% 60%, rgba(60,100,30,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 80% 30%, rgba(100,70,20,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Floating particles (Client Component) */}
      <div className="absolute inset-0 -z-10">
        <EarthParticlesClient />
      </div>

      {/* Horizontal divider line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px -z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(80,120,40,0.5), transparent)' }}
      />

      {error || !data ? (
        /* Elegant glass error card */
        <div className="relative z-10 max-w-md mx-auto px-6 w-full text-center">
          <div className="bg-slate-950/20 backdrop-blur-md border border-red-500/20 rounded-2xl p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.5), transparent)' }} />
            <span className="text-3xl block mb-3">🌍</span>
            <p className="text-sm font-semibold text-red-300">
              Unable to load profile.
            </p>
          </div>
        </div>
      ) : (
        /* Render about content details */
        <AboutClient
          data={{
            headline: data.about.headline,
            status: data.about.status,
            projectNo: data.about.projectNo,
            profile_url: data.profile.profile_url,
          }}
        />
      )}

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(80,120,40,0.4), transparent)' }}
      />
    </section>
  );
}