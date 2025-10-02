import React from 'react';
import '../styles/SparkleText.scss';

interface SparkleTextProps {
  children: React.ReactNode;
  className?: string;
}

const SparkleText: React.FC<SparkleTextProps> = ({ children, className = '' }) => {
  // SVG sparkle path
  const sparklePath = "M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z";

  return (
    <div className={`sparkle-text ${className}`}>
      {/* Sparkle SVGs */}
      <svg className="sparkle sparkle-1" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={sparklePath} fill="currentColor" />
      </svg>
      <svg className="sparkle sparkle-2" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={sparklePath} fill="currentColor" />
      </svg>
      <svg className="sparkle sparkle-3" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={sparklePath} fill="currentColor" />
      </svg>
      <svg className="sparkle sparkle-4" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={sparklePath} fill="currentColor" />
      </svg>
      <svg className="sparkle sparkle-5" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={sparklePath} fill="currentColor" />
      </svg>
      
      {/* Text content */}
      <span className="text-main">{children}</span>
    </div>
  );
};

export default SparkleText;
