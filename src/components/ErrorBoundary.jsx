import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-teal-dark text-white text-center px-8">
          <p className="font-oswald text-2xl font-black uppercase mb-2">Something broke</p>
          <p className="font-inter text-sm text-white/60 mb-6">The vibes got too intense. Try again?</p>
          <button
            onClick={() => {
              sessionStorage.clear();
              window.location.replace(window.location.pathname);
            }}
            className="px-8 py-3 bg-orange text-white font-black uppercase text-xs tracking-widest rounded-full"
          >
            Restart
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
