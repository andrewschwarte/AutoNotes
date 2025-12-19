import { useEffect, useRef, useState } from "react";

export default function Monster({ color, height = "h-24" }) {
  const eyesRef = useRef([]);
  const pupilsRef = useRef([]);
  const maxMove = 5;
  const [isBlinking, setIsBlinking] = useState(false);

  // Track mouse and move pupils
  useEffect(() => {
    const handleMove = (e) => {
      eyesRef.current.forEach((eye, index) => {
        const pupil = pupilsRef.current[index];
        if (!eye || !pupil) return;

        const rect = eye.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const angle = Math.atan2(dy, dx);

        const x = Math.cos(angle) * maxMove;
        const y = Math.sin(angle) * maxMove;

        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Blinking effect with random intervals
  useEffect(() => {
    const scheduleNextBlink = () => {
      // Random delay between 2-5 seconds
      const delay = Math.random() * 3000 + 2000;

      return setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          // Schedule next blink after this one finishes
          timeoutRef.current = scheduleNextBlink();
        }, 150);
      }, delay);
    };

    const timeoutRef = { current: scheduleNextBlink() };

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // utility functions to register eyes/pupils
  const setEyeRef = (el) => {
    if (el && !eyesRef.current.includes(el)) eyesRef.current.push(el);
  };

  const setPupilRef = (el) => {
    if (el && !pupilsRef.current.includes(el)) pupilsRef.current.push(el);
  };

  return (
    <div className="relative">
      <img
        className=""
        src="https://media.istockphoto.com/id/965307792/photo/chimpanzee-face.jpg?s=612x612&w=0&k=20&c=ubJK1XiTVeoM4u0t2c-L-CpFAEdiRa4dfXfmbpj4ubo="
        alt="monkey"
      />
      {/* Eyes */}
      <div className="absolute left-20 top-[4rem] flex space-x-5 z-10">
        <div
          className="relative w-5 h-5 bg-white rounded-full overflow-hidden"
          ref={setEyeRef}
        >
          <div
            ref={setPupilRef}
            className="absolute w-2 h-2 bg-black rounded-full top-1.5 left-1.5 transition-transform duration-75 ease-linear"
          />
          {/* Eyelid */}
          {isBlinking && <div className="absolute inset-0 bg-amber-900"></div>}
        </div>
        <div
          className="relative w-5 h-5 bg-white rounded-full overflow-hidden"
          ref={setEyeRef}
        >
          <div
            ref={setPupilRef}
            className="absolute w-2 h-2 bg-black rounded-full top-1.5 left-1.5 transition-transform duration-75 ease-linear"
          />
          {/* Eyelid */}
          {isBlinking && <div className="absolute inset-0 bg-amber-900"></div>}
        </div>
      </div>
    </div>
  );
}
