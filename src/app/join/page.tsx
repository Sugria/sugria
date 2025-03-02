import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JoinForm from '@/components/JoinForm'
import AnimatedSection from '@/components/AnimatedSection'

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />
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
        
        <AnimatedSection className="pt-[150px] md:py-32 relative z-10 flex-grow">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-12">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 tracking-[-1px] md:tracking-[-1.5px] lg:tracking-[-3px] text-white">
                  Join Our Movement
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/80">
                  Be part of the sustainable agricultural revolution in Africa.{' '}
                  <span className="hidden md:inline"><br /></span>
                  Join us in empowering farmers and transforming communities.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg w-full lg:w-[580px]">
                <JoinForm />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <Footer />
    </main>
  )
}