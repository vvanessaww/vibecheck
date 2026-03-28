import { useRef, useCallback } from 'react';

const SWIPE_THRESHOLD = 120;

export function useSwipe({ onSwipeComplete }) {
  const cardRef = useRef(null);
  const overlayLeftRef = useRef(null);
  const overlayRightRef = useRef(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const isDraggingRef = useRef(false);

  const resetCard = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
    card.style.transform = 'translate(0,0) rotate(0deg)';
    if (overlayLeftRef.current) overlayLeftRef.current.style.opacity = '0';
    if (overlayRightRef.current) overlayRightRef.current.style.opacity = '0';
  }, []);

  const swipeOut = useCallback((dir) => {
    const card = cardRef.current;
    if (!card) return;
    const x = dir === 'right' ? 500 : -500;
    card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in';
    card.style.transform = `translate(${x}px, ${currentYRef.current}px) rotate(${x / 15}deg)`;
    card.style.opacity = '0';
    setTimeout(() => onSwipeComplete(dir), 450);
  }, [onSwipeComplete]);

  const updatePosition = useCallback((dx) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `translate(${dx}px, 0px) rotate(${dx / 10}deg)`;
    const opacity = Math.min(Math.abs(dx) / 100, 1);
    if (overlayRightRef.current && overlayLeftRef.current) {
      if (dx > 0) {
        overlayRightRef.current.style.opacity = String(opacity);
        overlayLeftRef.current.style.opacity = '0';
      } else {
        overlayLeftRef.current.style.opacity = String(opacity);
        overlayRightRef.current.style.opacity = '0';
      }
    }
  }, []);

  const handleStart = useCallback((clientX) => {
    startXRef.current = clientX;
    currentXRef.current = 0;
    isDraggingRef.current = true;
    if (cardRef.current) cardRef.current.style.transition = 'none';
  }, []);

  const handleMove = useCallback((clientX) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = clientX - startXRef.current;
    updatePosition(currentXRef.current);
  }, [updatePosition]);

  const handleEnd = useCallback(() => {
    isDraggingRef.current = false;
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
    }
    if (Math.abs(currentXRef.current) > SWIPE_THRESHOLD) {
      swipeOut(currentXRef.current > 0 ? 'right' : 'left');
    } else {
      resetCard();
    }
  }, [swipeOut, resetCard]);

  const touchHandlers = {
    onTouchStart: (e) => handleStart(e.touches[0].clientX),
    onTouchMove: (e) => handleMove(e.touches[0].clientX),
    onTouchEnd: handleEnd,
  };

  const mouseHandlers = {
    onMouseDown: (e) => {
      handleStart(e.clientX);
      const onMouseMove = (ev) => handleMove(ev.clientX);
      const onMouseUp = () => {
        handleEnd();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
  };

  return {
    cardRef,
    overlayLeftRef,
    overlayRightRef,
    touchHandlers,
    mouseHandlers,
    simulateSwipe: swipeOut,
  };
}
