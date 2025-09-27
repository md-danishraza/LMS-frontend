import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="text-gray-500 bottom-0 w-full py-8 mt-10 text-center text-sm">
      <p>&copy; 2025 MD DANISH RAZA. All Rights Reserved.</p>
      <div className="mt-2">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="text-primary hover:text-accent-foreground mx-2"
            scroll={false}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;