import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomEase from 'gsap/CustomEase';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useRef, useCallback, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, CustomEase, ScrollToPlugin, ScrollSmoother);

interface Observer {
  enable: () => void;
  disable: () => void;
  kill: () => void;
}

const HTMLContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const currentSection = useRef(0); //0 is landing, 1 is about/scroll container
  const smoother = useRef<ScrollSmoother | null>(null);
  const intentObserver = useRef<Observer | null>(null);

  const snapScrollTo = useCallback((targetSection: number, isScrollingDown: boolean) => {
    // Only do the snap if scrolling down from landing or scrolling up from about
    if (targetSection === 1 && isScrollingDown) {
      animating.current = true;
      // Delay of 2 seconds to allow the landing animation to complete
      setTimeout(() => {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: "#scroll-container",
            autoKill: false
          },
          ease: "power2.inOut",
          onComplete: () => {
            animating.current = false;
            currentSection.current++;
            intentObserver.current?.disable(); // Disable the observer so you can scroll freely in the scroll container
          }
        });
      }, 2000);
    }
    else if (targetSection === 0 && !isScrollingDown){
      animating.current = true;
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: "#landing",
          autoKill: false
        },
        ease: "power2.inOut",
        onComplete: () => {
          animating.current = false;
          currentSection.current--;
        }
      });
    }
  }, []);

  useEffect(() => {
    // Initialize ScrollSmoother
    smoother.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      smoothTouch: 0.1,
      effects: true,
    });

    // Create intent observer
    const observer = ScrollTrigger.observe({
      type: "wheel,touch",
      onUp: () => {
        if (!animating.current && currentSection.current !== 0) snapScrollTo(currentSection.current - 1, false);
      },
      onDown: () => {
        if (!animating.current && currentSection.current !== 1) snapScrollTo(currentSection.current + 1, true);
        else if (currentSection.current === 1) observer.disable();
      },
      preventDefault: true,
      onPress: self => {
        if (ScrollTrigger.isTouch) self.event.preventDefault();
      }
    });

    intentObserver.current = observer;

    // Create ScrollTrigger for landing section
    ScrollTrigger.create({
      trigger: landingRef.current,
      start: "top top",
      end: "bottom top",
      markers: true,
      onEnter: () => {
        if (!animating.current) {
          observer.enable();
          snapScrollTo(1, true);
        }
      },
      onEnterBack: () => {
        if (!animating.current) {
          observer.enable();
          snapScrollTo(0, false);
        }
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      smoother.current?.kill();
      observer.kill();
    };
  }, [snapScrollTo]);

  return (
    <div ref={containerRef} className="relative z-10 select-none pointer-events-none">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center py-4 px-15 select-none z-50 pointer-events-auto">
        <button className="rounded-lg bg-secondary hover:animate-wiggle-more hover:animate-infinite">
          <img src="R_200x200.png" alt="Logo" className="w-10 h-10" />
        </button>
        <div className="flex gap-4">
          <button className="rounded-lg p-1 py-1 bg-secondary hover:bg-gray-400 active:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          </button>
          <button className="rounded-lg p-1 bg-secondary hover:bg-gray-400 active:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      <div id="smooth-wrapper" className="h-screen overflow-hidden">
        <div id="smooth-content" className="relative">
          {/* Landing Page Container */}
          <div ref={landingRef} id='landing' className="h-screen w-full flex flex-1 flex-col md:flex-row pointer-events-auto">
            <div className="flex justify-center items-center p-6 h-1/2 h-auto md:w-1/2">
              <div className="flex flex-col items-center items-start md:text-left space-y-2 select-none">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">Hi, my</div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">name is Renato.</div>
                <div className='leading-tight'>
                  <div className="text-sm sm:text-base md:text-lg opacity-80 font-normal">I'm a Full Stack Developer from Canada.</div>
                </div>
              </div>
            </div>
            <div className="flex-1" />
          </div>

          {/* Scroll Container */}
          <div ref={scrollContainerRef} id="scroll-container" className="min-h-screen overflow-y-auto pointer-events-auto">
            {/* About Me Section */}
            <div id='about' className="min-h-screen w-full flex flex-1 flex-col md:flex-row">
              <div className="flex justify-center items-center p-6 h-1/2 h-auto md:w-1/2">
                <div className="flex flex-col items-center items-start md:text-left space-y-2 select-none">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">About Me</div>
                  <div className="text-sm sm:text-base md:text-lg opacity-80 font-normal">
                    <div>Building interactive experiences and</div>
                    <div>solving problems are areas I excel at</div>
                  </div>
                </div>
              </div>
              <div className="flex-1" />
            </div>

            {/* Projects Section */}
            <div id='projects' className="min-h-screen w-full flex flex-1 flex-col md:flex-row">
              <div className="flex justify-center items-center p-6 h-1/2 h-auto md:w-1/2">
                <div className="flex flex-col items-center items-start md:text-left space-y-2 select-none">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">Projects</div>
                  <div className="text-sm sm:text-base md:text-lg opacity-80 font-normal">
                    <div>Look upon my works</div>
                  </div>
                </div>
              </div>
              <div className="flex-1" />
            </div>

            {/* Footer */}
            <footer className="text-center py-2">
              Renato Serkhanian - 2025
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HTMLContent;