import Link from 'next/link';
import Layout from '@/components/Layout';
import { generateMetadata } from '@/lib/metadata';

export default function Custom404() {
  return (
    <>
      {generateMetadata({
        title: 'Page Not Found - Amrytt Blogs',
        description: 'The page you are looking for could not be found. Return to our fitness blog for the latest articles on workouts, nutrition, and wellness.',
        url: '/404'
      })}
      
      <Layout>
        <div className="bg-[#fafafa] min-h-screen px-3.5 md:px-7 lg:px-0">
          {/* Page Header */}
          <div className="flex flex-col items-center justify-center py-8 md:py-16 w-full">
            <div className="flex flex-col items-center gap-1 text-center max-w-4xl px-6">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-1 text-[#262d4d] text-sm font-bold tracking-[1px] uppercase mb-4">
                <Link href={'/'}>
                  <span className="font-bold hover:text-[#10152e] transition-colors">Home</span>
                </Link>
                <span className="font-normal">/</span>
                <span className="font-normal">404</span>
              </div>

              {/* Title */}
              <h1 className="text-[#10152e] text-2xl md:text-4xl lg:text-[48px] font-semibold leading-tight md:leading-[66px] tracking-[1px] text-center mb-6">
                Page Not Found
              </h1>
            </div>
          </div>

          {/* 404 Content */}
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center gap-8 w-full max-w-[800px] px-6">
              {/* 404 Illustration */}
              <div className="relative w-full max-w-[400px] h-[300px] flex items-center justify-center">
                <div className="text-[#e5e6ea] text-[120px] md:text-[180px] font-bold leading-none select-none">
                  404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#10152e] rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="text-[#10152e] text-xl md:text-2xl font-semibold leading-tight tracking-[1px]">
                  Oops! This page seems to have gone for a workout
                </h2>
                <p className="text-[#4e5265] text-base leading-6 tracking-[1px] max-w-[500px]">
                  The page you're looking for might have been moved, deleted, or you entered the wrong URL. 
                  Don't worry, let's get you back on track with your fitness journey.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                <Link 
                  href="/"
                  className="bg-[#10152e] text-white px-6 py-3 rounded-xl font-medium tracking-[1px] hover:bg-[#262d4d] transition-colors flex items-center gap-2 min-w-[160px] justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Back to Home
                </Link>
                
                <button 
                  onClick={() => window.history.back()}
                  className="border border-[#10152e] text-[#10152e] px-6 py-3 rounded-xl font-medium tracking-[1px] hover:bg-[#10152e] hover:text-white transition-colors flex items-center gap-2 min-w-[160px] justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Go Back
                </button>
              </div>

              {/* Helpful Links */}
              <div className="flex flex-col items-center gap-6 w-full mt-8 pt-8 border-t border-[#e5e6ea]">
                <h3 className="text-[#10152e] text-lg font-semibold tracking-[1px]">
                  Popular Fitness Topics
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link 
                    href="/?category=fitness"
                    className="bg-[#f5f5f5] text-[#10152e] px-4 py-2 rounded-lg text-sm font-medium tracking-[1px] hover:bg-[#e5e6ea] transition-colors"
                  >
                    Fitness
                  </Link>
                  <Link 
                    href="/?category=nutrition"
                    className="bg-[#f5f5f5] text-[#10152e] px-4 py-2 rounded-lg text-sm font-medium tracking-[1px] hover:bg-[#e5e6ea] transition-colors"
                  >
                    Nutrition
                  </Link>
                  <Link 
                    href="/?category=yoga"
                    className="bg-[#f5f5f5] text-[#10152e] px-4 py-2 rounded-lg text-sm font-medium tracking-[1px] hover:bg-[#e5e6ea] transition-colors"
                  >
                    Yoga
                  </Link>
                  <Link 
                    href="/?category=cardio"
                    className="bg-[#f5f5f5] text-[#10152e] px-4 py-2 rounded-lg text-sm font-medium tracking-[1px] hover:bg-[#e5e6ea] transition-colors"
                  >
                    Cardio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}