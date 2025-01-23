import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Heart, ChevronLeft, ChevronRight, Cake, Stars, Music, Camera, Coffee, Gift, PartyPopper } from 'lucide-react';
import Slideshow from './components/Slideshow.tsx';

interface Slide {
  date: string;
  message: string;
  imageUrl: string;
  icon?: React.ReactNode;
}

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const calculateTimeUntilBirthday = () => {
  const now = new Date();
  const birthday = new Date(now.getFullYear(), 0, 24);
  if (now > birthday) {
    birthday.setFullYear(birthday.getFullYear() + 1);
  }
  const diff = birthday.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};

const priyuAge = calculateAge(new Date(2004, 0, 24));

const slides: Slide[] = [
  {
    date: 'January 24, 2004',
    message: `A star was born ✨ The day the world became brighter with Priyu's arrival`,
    imageUrl: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&q=80',
    icon: <Stars className="text-yellow-400" />
  },
  {
    date: 'When we first met',
    message: 'The moment our eyes met, my heart knew it found its home',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80',
    icon: <Heart className="text-pink-500" />
  },
  {
    date: 'Our first coffee date',
    message: 'Sipping coffee together, watching time stand still',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80',
    icon: <Coffee className="text-brown-600" />
  },
  {
    date: 'Our first picture together',
    message: 'Capturing moments, creating memories that last forever',
    imageUrl: 'https://images.unsplash.com/photo-1522827489705-0616731a52a8?auto=format&fit=crop&q=80',
    icon: <Camera className="text-blue-500" />
  },
  {
    date: 'Today',
    message: `Happy ${priyuAge}th Birthday, Priyu! 🎂\nEvery moment with you is a blessing. Here's to many more years of love, laughter, and adventures together! ❤️`,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
    icon: <Cake className="text-pink-500" />
  }
];

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [isCardUnwrapped, setIsCardUnwrapped] = useState(false);
  const [timeUntilBirthday, setTimeUntilBirthday] = useState(calculateTimeUntilBirthday());
  const [showFireworks, setShowFireworks] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; color: string }>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilBirthday(calculateTimeUntilBirthday());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const createFirework = (x: number, y: number) => {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;

    const colors = ['#ff69b4', '#ff1493', '#ff69b4', '#ff1493', '#ff69b4'];
    
    for (let i = 0; i < 30; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      spark.style.transform = `rotate(${i * 12}deg) translateY(-100px)`;
      firework.appendChild(spark);
    }

    document.querySelector('.fireworks')?.appendChild(firework);
    setTimeout(() => firework.remove(), 1000);
  };

  const createConfetti = () => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}%`,
      color: ['#ff69b4', '#ff1493', '#ff69b4', '#ff1493'][Math.floor(Math.random() * 4)]
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  const handleCelebrate = () => {
    setShowFireworks(true);
    createConfetti();
    
    const interval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight / 2);
        setTimeout(() => createFirework(x, y), i * 100);
      }
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setShowFireworks(false);
      window.location.href = '/Slideshow';
    }, 4000);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-bold text-pink-500 mb-4">Happy Birthday Priyu! 🎉</h1>
          <p className="text-2xl text-gray-700">Click anywhere to start your birthday journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
      {/* Countdown Timer */}
      <div className="fixed top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-semibold text-pink-500 mb-2">Next Birthday In:</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <span className="block text-2xl font-bold">{timeUntilBirthday.days}</span>
            <span className="text-sm">Days</span>
          </div>
          <div>
            <span className="block text-2xl font-bold">{timeUntilBirthday.hours}</span>
            <span className="text-sm">Hours</span>
          </div>
          <div>
            <span className="block text-2xl font-bold">{timeUntilBirthday.minutes}</span>
            <span className="text-sm">Mins</span>
          </div>
          <div>
            <span className="block text-2xl font-bold">{timeUntilBirthday.seconds}</span>
            <span className="text-sm">Secs</span>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-md relative">
        {/* Hearts Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className={`absolute text-pink-300 opacity-50 animate-float-${i % 5}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
              size={16}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-[28rem]">
            <img
              src={slides[currentSlide].imageUrl}
              alt="Memory"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            
            {/* Navigation Buttons */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="p-2 rounded-full bg-white/30 backdrop-blur-sm text-white disabled:opacity-50 transition-all hover:bg-white/40"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="p-2 rounded-full bg-white/30 backdrop-blur-sm text-white disabled:opacity-50 transition-all hover:bg-white/40"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                {slides[currentSlide].icon}
                <h2 className="text-2xl font-bold">{slides[currentSlide].date}</h2>
              </div>
              <p className="text-lg whitespace-pre-line">{slides[currentSlide].message}</p>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 p-4 bg-white">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-pink-500 w-8' : 'bg-gray-300 w-2 hover:bg-pink-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Interactive Buttons */}
        <div className="absolute -top-4 -right-4 flex gap-2">
          <button
            onClick={toggleMusic}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-pink-50 transition-colors"
          >
            <Music className={`${isPlaying ? 'text-pink-500' : 'text-gray-400'}`} size={24} />
          </button>
          <button
            onClick={() => setShowCard(true)}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-pink-50 transition-colors"
          >
            <Gift className="text-pink-500" size={24} />
          </button>
        </div>
      </div>

      {/* Celebrate Button */}
      <button
        onClick={handleCelebrate}
        className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full font-semibold shadow-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
      >
        <PartyPopper size={20} />
        Click Here to Celebrate!
      </button>

      {/* Birthday Card Modal */}
      {showCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={`bg-white rounded-2xl p-8 max-w-md w-full transform transition-transform ${isCardUnwrapped ? 'scale-100' : 'scale-95'}`}>
            {!isCardUnwrapped ? (
              <button
                onClick={() => setIsCardUnwrapped(true)}
                className="w-full h-64 bg-pink-100 rounded-lg flex items-center justify-center hover:bg-pink-200 transition-colors"
              >
                <Gift size={48} className="text-pink-500" />
                <span className="ml-2 text-lg font-semibold">Click to unwrap your special message!</span>
              </button>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-pink-500 mb-4">Dear Priyu,</h2>
                <p className="text-gray-700 mb-4">
                  On your special day, I want you to know how much joy and happiness you bring to my life.
                  Your smile lights up my world, and your love makes every day beautiful.
                  Here's to celebrating you, not just today, but every single day.
                </p>
                <p className="text-xl font-semibold text-pink-500">Happy Birthday, my love! ❤️</p>
                <button
                  onClick={() => setShowCard(false)}
                  className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fireworks Animation */}
      {showFireworks && (
        <>
          <div className="fireworks" />
          {confetti.map(({ id, left, color }) => (
            <div
              key={id}
              className="confetti"
              style={{
                left,
                backgroundColor: color,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Slideshow" element={<Slideshow />} />
    </Routes>
  );
}

export default App;