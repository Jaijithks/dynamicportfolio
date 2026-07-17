import AboutClient from './AboutClient';

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
    fetch('https://my-api-6pmy.onrender.com/api/profile/about', { next: { revalidate: 3600 } }),
    fetch('https://my-api-6pmy.onrender.com/api/profile/profilepic', { next: { revalidate: 3600 } }),
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
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* ── Top divider ────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {error || !data ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center px-6">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Unable to load profile.
            </p>
          </div>
        </div>
      ) : (
        <AboutClient
          data={{
            headline: data.about.headline,
            status: data.about.status,
            projectNo: data.about.projectNo,
            profile_url: data.profile.profile_url,
          }}
        />
      )}
    </section>
  );
}