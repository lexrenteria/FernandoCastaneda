/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Instagram, ArrowRight, Menu, X, ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// --- Types & Data ---

interface Project {
  id: string;
  title: string;
  year: string;
  type: string;
  image: string;
  poster: string;
  description?: string;
  techSpecs?: {
    duration: string;
    location: string;
    format: string;
    aspectRatio: string;
    sound: string;
  };
  festivals?: string[];
  credits: Record<string, string>;
}

const PROJECTS: Project[] = [
  {
    id: "aura-roja",
    title: "AURA ROJA",
    year: "2026",
    type: "Cortometraje Documental",
    image: "https://picsum.photos/seed/auraroja-still/1920/1080",
    poster: "https://picsum.photos/seed/auraroja-poster/600/900",
    techSpecs: {
      duration: "15 min",
      location: "México",
      format: "Digital 4K / DCP 2K",
      aspectRatio: "16:9",
      sound: "5.1 THX"
    },
    festivals: [
      "Selección Oficial - Festival Internacional de Cine en Guadalajara (2026)",
      "Mención Honorífica - DocsMX (2026)"
    ],
    credits: {
      "Dirección": "Fernando Castañeda",
      "Producción": "Fernando Castañeda",
      "Escritura": "Fernando Castañeda, Daniela Villaseñor",
      "Cinematografía": "Daniela Villaseñor",
      "Edición": "Fernando Castañeda, Jesús Dávalos Raygoza",
      "Diseño Sonoro": "Alejandro Camarena",
    },
  },
  {
    id: "en-algun-lugar",
    title: "EN ALGÚN LUGAR DENTRO DE MÍ",
    year: "2025",
    type: "Cortometraje Documental",
    image: "https://picsum.photos/seed/enalgunlugar-still/1920/1080",
    poster: "https://picsum.photos/seed/enalgunlugar-poster/600/900",
    description: "\"En algún lugar dentro de mí\" es la historia de amistad entre Brahel y Andoeni, narrada desde la autorreferencia, la intimidad y la vulnerabilidad. Se conocieron en su infancia y años después, su relación amorosa terminó en desamor, pero su amistad se mantuvo. Tras la transición de género de Brahel, se reencontraron y redescubrieron su vínculo. Su historia es un viaje de identidad y reencuentro, contado a través de material de archivo, risas, silencios y el cariño que las une.",
    techSpecs: {
      duration: "20 min",
      location: "México",
      format: "Digital 4K",
      aspectRatio: "4:3 / 16:9",
      sound: "Stereo / 5.1"
    },
    festivals: [
      "Premio del Público - Festival de Cine de Morelia (2025)",
      "Selección Oficial - FILMA Jalisco (2025)"
    ],
    credits: {
      "Dirección": "Andoeni Padilla",
      "Producción": "Pável Estrella, Fernando Castañeda",
      "Guion": "Andoeni Padilla, Alejandro de la Torre, Perla Ortega",
      "Fotografía": "Ale Alejandro de la Torre",
      "Edición": "Perla Ortega",
      "Música": "Mish Vizcarra",
      "Sonido": "Mariana Rivas",
      "Diseño Sonoro": "Hugo Castañeda",
      "Cast": "Brahel Bejar López de Alba",
      "Co-productores": "Universidad de Guadalajara, FILMA Jalisco",
    },
  },
  {
    id: "efluvio-y-sombras",
    title: "EFLUVIO Y SOMBRAS",
    year: "2024",
    type: "Videoclip",
    image: "https://picsum.photos/seed/efluvio-still/1920/1080",
    poster: "https://picsum.photos/seed/efluvio-poster/600/900",
    description: "Una mujer recibe un misterioso llamado que la lleva un bosque oscuro, en donde descubrirá que es parte de algo más grande que ella misma. Un videoclip de Huesos de Tejón.",
    techSpecs: {
      duration: "4 min",
      location: "México",
      format: "Digital 4K",
      aspectRatio: "2.35:1",
      sound: "Stereo"
    },
    credits: {
      "Dirección": "Fernando Castañeda",
    },
  },
  {
    id: "nefelibata",
    title: "NEFELIBATA",
    year: "2017",
    type: "Cortometraje de Ficción",
    image: "https://picsum.photos/seed/nefelibata-still/1920/1080",
    poster: "https://picsum.photos/seed/nefelibata-poster/600/900",
    techSpecs: {
      duration: "11:40 min",
      location: "México",
      format: "Digital 720p",
      aspectRatio: "16:9",
      sound: "Stereo"
    },
    festivals: [
      "Selección Oficial - Short Shorts Film Festival Mexico (2017)"
    ],
    credits: {
      "Dirección y Guion": "Fernando Castañeda",
      "Producción": "Santiago Zamora González",
      "Fotografía": "Moisés Aranda Guillén",
      "Sonido Directo": "Christian Garnica",
      "Arte y Vestuario": "Paola Tostado",
      "Edición": "Raúl Castro",
    },
  },
];

const OTHER_WORKS = [
  { title: "Virginia", year: "2018", role: "Dirección y Guion" },
  { title: "Entre Escombros", year: "2018", role: "Dirección y Producción" },
  { title: "Huellas", year: "2024", role: "Dirección y Producción (Programa DocsMX/Bogoshorts)" },
];

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const SEO = ({ 
  title, 
  description, 
  image, 
  url 
}: { 
  title?: string; 
  description?: string; 
  image?: string; 
  url?: string;
}) => {
  const baseTitle = "Fernando Castañeda | Filmmaker";
  const baseDesc = "Portafolio cinematográfico de Fernando Castañeda, cineasta y co-fundador de Labrador Films.";
  const baseImage = "https://image.tmdb.org/t/p/original/aPU1KSWkazCdqKZfYCzYfR1mWhb.jpg";
  const baseUrl = "https://soyfernandocastaneda.com";

  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  const fullDesc = description || baseDesc;
  const fullImage = image || baseImage;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={fullImage} />
      
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

const SectionHeading = ({ children, number }: { children: React.ReactNode; number: string }) => (
  <div className="flex items-baseline gap-4 mb-12 border-b border-offwhite/10 pb-4">
    <span className="text-xs font-mono opacity-40">{number}</span>
    <h2 className="text-3xl md:text-5xl uppercase tracking-tighter">{children}</h2>
  </div>
);

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12 md:py-8 flex justify-between items-center ${
          scrolled || !isHome ? "bg-charcoal/90 backdrop-blur-md py-4" : "bg-transparent"
        }`}
      >
        <Link to="/" className="text-xl md:text-2xl font-serif tracking-tighter hover:text-accent transition-colors">
          Fernando Castañeda
        </Link>
        
        <div className="hidden md:flex gap-12">
          {isHome ? (
            <>
              <a href="#bio" className="nav-link">Bio</a>
              <a href="#proyectos" className="nav-link">Proyectos</a>
              <a href="#contacto" className="nav-link">Contacto</a>
            </>
          ) : (
            <Link to="/" className="nav-link">Inicio</Link>
          )}
        </div>

        <button 
          className="md:hidden p-2 text-offwhite"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center gap-8 text-2xl font-serif"
          >
            {isHome ? (
              <>
                <a href="#bio" onClick={() => setIsMenuOpen(false)} className="hover:text-accent">Bio</a>
                <a href="#proyectos" onClick={() => setIsMenuOpen(false)} className="hover:text-accent">Proyectos</a>
                <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="hover:text-accent">Contacto</a>
              </>
            ) : (
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-accent">Inicio</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HomePage = () => {
  return (
    <PageWrapper>
      <SEO />
      {/* Hero Section */}
      <header className="relative h-screen flex flex-col justify-end px-6 pb-12 md:px-12 md:pb-24 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://image.tmdb.org/t/p/original/aPU1KSWkazCdqKZfYCzYfR1mWhb.jpg" 
            alt="Fernando Castañeda"
            className="w-full h-full object-cover object-top grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-9xl font-serif leading-none tracking-tighter mb-6"
          >
            Fernando <br /> Castañeda
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-accent uppercase tracking-[0.3em] text-xs font-semibold"
          >
            Filmmaker & Visual Artist
          </motion.p>
        </div>
      </header>

      <main className="px-6 md:px-12 py-24 space-y-48">
        {/* Bio Section */}
        <section id="bio" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <SectionHeading number="01">Bio</SectionHeading>
          </div>
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-2xl md:text-4xl font-serif leading-relaxed italic text-offwhite/90">
                Licenciado en Artes Audiovisuales por la Universidad de Guadalajara. Cineasta y co-fundador de la productora "Labrador Films".
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-offwhite/60 max-w-2xl">
                Su trabajo se centra en la narrativa documental y de ficción, explorando temas de identidad y memoria. A través de una mirada íntima y contemplativa, busca capturar la esencia de lo humano en sus diversas manifestaciones.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="proyectos" className="space-y-24">
          <SectionHeading number="02">Proyectos</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {PROJECTS.map((project) => (
              <motion.article 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Link to={`/proyecto/${project.id}`} className="project-card group block">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest border border-offwhite/10">
                    {project.year}
                  </div>
                </Link>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-accent text-[10px] uppercase tracking-widest mb-1">{project.type}</p>
                    <h3 className="text-2xl md:text-3xl uppercase tracking-tighter">{project.title}</h3>
                  </div>
                  <Link 
                    to={`/proyecto/${project.id}`} 
                    className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-accent transition-all flex items-center gap-2"
                  >
                    Ver Detalles <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Other Works */}
        <section className="space-y-12">
          <SectionHeading number="03">Otros Trabajos</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {OTHER_WORKS.map((work) => (
              <motion.div 
                key={work.title}
                whileHover={{ y: -5 }}
                className="p-8 border border-offwhite/10 bg-offwhite/[0.02] hover:bg-offwhite/[0.05] transition-colors group"
              >
                <span className="text-[10px] font-mono opacity-40 mb-4 block">{work.year}</span>
                <h3 className="text-2xl mb-4 group-hover:text-accent transition-colors">{work.title}</h3>
                <p className="text-xs uppercase tracking-widest opacity-60 leading-relaxed">{work.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="text-center py-24 space-y-12">
          <SectionHeading number="04">Contacto</SectionHeading>
          <div className="max-w-2xl mx-auto space-y-8">
            <p className="text-2xl md:text-4xl font-serif italic">
              Para colaboraciones, prensa o consultas generales, conecta a través de Instagram.
            </p>
            <motion.a 
              href="https://www.instagram.com/soyfernandocastaneda" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full text-lg font-medium hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
            >
              <Instagram size={24} />
              @soyfernandocastaneda
            </motion.a>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
};

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);
  const otherProjects = PROJECTS.filter((p) => p.id !== id);

  if (!project) return <NotFoundPage />;

  return (
    <PageWrapper>
      <SEO 
        title={project.title} 
        description={project.description || `${project.title} - ${project.type} (${project.year})`}
        image={project.poster}
        url={`/proyecto/${project.id}`}
      />
      <div className="bg-charcoal min-h-screen">
      {/* Hero Still */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-32 relative z-10 pb-24">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all mb-12 bg-charcoal/80 backdrop-blur-md px-4 py-2 border border-offwhite/10"
        >
          <ArrowLeft size={14} /> Volver al Inicio
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Title & Main Info */}
          <div className="lg:col-span-8 space-y-24">
            <header className="space-y-4">
              <h1 className="text-6xl md:text-9xl uppercase tracking-tighter leading-none font-serif">
                {project.title}
              </h1>
              <p className="text-4xl md:text-5xl font-serif italic opacity-40">{project.year}</p>
            </header>

            <div className="space-y-16">
              {/* Synopsis */}
              <section className="space-y-8">
                <SectionHeading number="01">Sinopsis</SectionHeading>
                <p className="text-xl md:text-2xl font-serif leading-relaxed text-offwhite/80">
                  {project.description || "Sinopsis detallada próximamente."}
                </p>
              </section>

              {/* Festivals */}
              {project.festivals && project.festivals.length > 0 && (
                <section className="space-y-8">
                  <SectionHeading number="02">Festivales y Premios</SectionHeading>
                  <ul className="space-y-4">
                    {project.festivals.map((fest, i) => (
                      <li key={i} className="text-lg md:text-xl font-serif italic opacity-70 flex items-start gap-4">
                        <span className="text-accent mt-1">•</span>
                        {fest}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Full Credits */}
              <section className="space-y-8">
                <SectionHeading number="03">Créditos</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {Object.entries(project.credits).map(([role, name]) => (
                    <div key={role} className="flex flex-col border-b border-offwhite/5 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-accent mb-1">{role}</span>
                      <span className="text-lg uppercase tracking-tight opacity-90">{name}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Poster & Tech Specs */}
          <div className="lg:col-span-4 space-y-12">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="aspect-[2/3] overflow-hidden border border-offwhite/10 shadow-2xl"
            >
              <img 
                src={project.poster} 
                alt={`${project.title} Poster`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Tech Specs Table */}
            <div className="bg-offwhite/[0.03] border border-offwhite/10 p-8 space-y-6">
              <h4 className="text-xs uppercase tracking-widest opacity-40 border-b border-offwhite/10 pb-2">Ficha Técnica</h4>
              <div className="space-y-4">
                {project.techSpecs && Object.entries(project.techSpecs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-baseline gap-4 text-[11px] uppercase tracking-wider">
                    <span className="opacity-40">{key}</span>
                    <span className="text-right font-semibold">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-baseline gap-4 text-[11px] uppercase tracking-wider">
                  <span className="opacity-40">Tipo</span>
                  <span className="text-right font-semibold">{project.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects Navigation */}
        <section className="mt-48 pt-24 border-t border-offwhite/10 space-y-12">
          <SectionHeading number="Next">Otros Proyectos</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherProjects.map((p) => (
              <Link key={p.id} to={`/proyecto/${p.id}`} className="group space-y-4">
                <div className="aspect-video overflow-hidden border border-offwhite/10">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl uppercase tracking-tighter group-hover:text-accent transition-colors">{p.title}</h3>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      </div>
    </PageWrapper>
  );
};

const NotFoundPage = () => {
  return (
    <PageWrapper>
      <SEO title="404 - Escena no encontrada" />
      <div className="h-screen flex flex-col items-center justify-center text-center px-6 space-y-8">
      <motion.h1 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-[15vw] font-serif leading-none tracking-tighter opacity-10"
      >
        404
      </motion.h1>
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-tighter">Escena no encontrada</h2>
        <p className="text-offwhite/40 uppercase tracking-widest text-xs">La página que buscas ha sido eliminada del montaje final.</p>
      </div>
      <Link 
        to="/" 
        className="inline-flex items-center gap-3 px-8 py-4 border border-offwhite/20 rounded-full text-xs uppercase tracking-widest hover:bg-offwhite hover:text-charcoal transition-all"
      >
        <ArrowLeft size={14} /> Volver al Inicio
      </Link>
      </div>
    </PageWrapper>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Fernando Castañeda",
    "alternateName": "Fernando Ramírez Fuentes",
    "jobTitle": "Filmmaker",
    "description": "Cineasta y co-fundador de la productora Labrador Films.",
    "url": "https://soyfernandocastaneda.com",
    "sameAs": ["https://www.instagram.com/soyfernandocastaneda"],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Director de Cine"
    },
    "mainEntityOfPage": {
      "@type": "CreativeWork",
      "hasPart": PROJECTS.map((p) => ({
        "@type": "Movie",
        "name": p.title,
        "datePublished": p.year,
        "director": { "@type": "Person", "name": p.credits["Dirección"] || p.credits["Dirección y Guion"] }
      }))
    }
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen selection:bg-accent selection:text-white">
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>

          <Navbar scrolled={scrolled} />

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/proyecto/:id" element={<ProjectDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>

          {/* Footer */}
          <footer className="px-6 md:px-12 py-12 border-t border-offwhite/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-[10px] uppercase tracking-[0.2em]">
            <p>© {new Date().getFullYear()} Fernando Castañeda</p>
            <p>Labrador Films</p>
            <p>soyfernandocastaneda.com</p>
          </footer>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
