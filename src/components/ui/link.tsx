import { cn } from "@/lib/utils";
import Link from "next/link";

const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className: string }) => {
    return (
        <Link 
            href={href} 
            className={cn(
                "block text-lg font-medium text-gray-700 hover:text-emerald-500 transition-colors",
                className
            )}
        >
            {children}
        </Link>
    );
};

export default NavLink;


