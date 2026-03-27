import Header from './Header';
import Footer from './Footer';

export default function PhoneFrame({ children, showHeader = true, showFooter = true }) {
  return (
    <div className="w-full min-h-dvh bg-black flex justify-center items-center font-inter">
      <div
        className="relative w-full max-w-[393px] bg-gradient-to-b from-teal-dark via-teal-mid to-purple-dark overflow-hidden flex flex-col shadow-2xl"
        style={{ height: '100dvh', maxHeight: '852px' }}
      >
        {showHeader && <Header />}
        <main className="relative z-20 flex-1 w-full px-5 py-2 flex flex-col justify-center overflow-y-auto pb-32">
          {children}
        </main>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}
