import ProgramForm from '@/components/programs/ProgramForm'
import AnimatedSection from '@/components/AnimatedSection'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ProgramsPage() {
  return (
    <>
      <div className="lg:hidden">
        <Header />
      </div>
      <main className="bg-white flex flex-col">
        <div className="relative">
          <div className="absolute inset-0 w-full h-full z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
            >
              <source src="/hero-bg.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/80" />
          </div>
          
          <AnimatedSection className="pt-20 sm:pt-24 md:pt-32 pb-8 md:pb-12 relative z-10">
            <div className="container mx-auto px-4">
              <Link href="/" className="inline-flex items-center text-white mb-6 md:mb-8 hover:text-white/80 transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </Link>
              <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 sm:gap-8 lg:gap-12">
                <div className="flex-1 text-center lg:text-left mb-6 lg:mb-0">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 tracking-[-1px] md:tracking-[-1.5px] lg:tracking-[-3px] text-white">
                    Apply for Funding
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-md mx-auto lg:mx-0">
                    Fill out the form if you wish to access our funding and training opportunities.
                  </p>
                </div>
                
                <div className="bg-white p-4 sm:p-6 md:p-8 shadow-lg w-full lg:w-[580px]">
                  <ProgramForm />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <div className="lg:hidden">
        <Footer />
      </div>
    </>
  )
}